import React, { useEffect, useRef } from 'react';

interface PointerPrototype {
  id: number;
  x: number;
  y: number;
  dx: number;
  dy: number;
  down: boolean;
  moved: boolean;
  color: number[];
}

interface SplashCursorProps {
  SPLAT_RADIUS?: number;
  SPLAT_FORCE?: number;
  DENSITY_DISSIPATION?: number;
  VELOCITY_DISSIPATION?: number;
  PRESSURE?: number;
  PRESSURE_ITERATIONS?: number;
  CURL?: number;
  TRANSPARENT?: boolean;
  BACK_COLOR?: { r: number; g: number; b: number };
  COLOR_UPDATE_SPEED?: number;
}

const SplashCursor: React.FC<SplashCursorProps> = ({
  SPLAT_RADIUS = 0.25,
  SPLAT_FORCE = 6000,
  DENSITY_DISSIPATION = 0.98,
  VELOCITY_DISSIPATION = 0.99,
  PRESSURE = 0.8,
  PRESSURE_ITERATIONS = 20,
  CURL = 30,
  TRANSPARENT = true,
  BACK_COLOR = { r: 0, g: 0, b: 0 },
  COLOR_UPDATE_SPEED = 10,
}) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    let pointers: PointerPrototype[] = [];
    let splatStack: any[] = [];
    
    const gl = canvas.getContext('webgl2') as WebGL2RenderingContext;
    if (!gl) {
      console.error('WebGL 2 not supported');
      return;
    }

    let texelSizeX: number, texelSizeY: number;
    let density: WebGLTexture,
        velocity: WebGLTexture,
        divergence: WebGLTexture,
        curl: WebGLTexture,
        pressure: WebGLTexture;
    let densityFBO: WebGLFramebuffer,
        velocityFBO: WebGLFramebuffer,
        divergenceFBO: WebGLFramebuffer,
        curlFBO: WebGLFramebuffer,
        pressureFBO: WebGLFramebuffer;
    let clearProgram: WebGLProgram,
        splatProgram: WebGLProgram,
        advectionProgram: WebGLProgram,
        divergenceProgram: WebGLProgram,
        curlProgram: WebGLProgram,
        pressureProgram: WebGLProgram,
        gradientSubtractProgram: WebGLProgram;
    let quadBuffer: WebGLBuffer;

    function initializeFramebuffers() {
      density = createDoubleBuffer(gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
      velocity = createDoubleBuffer(gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);

      divergence = createFBO(gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
      curl = createFBO(gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);
      pressure = createDoubleBuffer(gl.RGBA16F, gl.RGBA, gl.HALF_FLOAT);

      densityFBO = density.read.fbo;
      velocityFBO = velocity.read.fbo;
      divergenceFBO = divergence.fbo;
      curlFBO = curl.fbo;
      pressureFBO = pressure.read.fbo;
    }

    function createDoubleBuffer(format: number, type: number, filter: number) {
      let fbo1 = createFBO(format, type, filter);
      let fbo2 = createFBO(format, type, filter);

      return {
        read: fbo1,
        write: fbo2,
        swap: () => {
          let temp = fbo1;
          fbo1 = fbo2;
          fbo2 = temp;
          this.read = fbo1;
          this.write = fbo2;
        },
      };
    }

    function createFBO(format: number, type: number, filter: number) {
      gl.getExtension('EXT_color_buffer_float');

      let texture = gl.createTexture();
      gl.bindTexture(gl.TEXTURE_2D, texture);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, filter);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
      gl.texImage2D(
        gl.TEXTURE_2D,
        0,
        format,
        gl.drawingBufferWidth,
        gl.drawingBufferHeight,
        0,
        type,
        gl.HALF_FLOAT,
        null
      );

      let fbo = gl.createFramebuffer();
      gl.bindFramebuffer(gl.FRAMEBUFFER, fbo);
      gl.framebufferTexture2D(
        gl.FRAMEBUFFER,
        gl.COLOR_ATTACHMENT0,
        gl.TEXTURE_2D,
        texture,
        0
      );
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.bindTexture(gl.TEXTURE_2D, null);

      return {
        texture: texture,
        fbo: fbo,
      };
    }

    function compileShader(type: number, source: string) {
      let shader = gl.createShader(type);

      if (!shader) {
        console.error('Failed to create shader');
        return null;
      }

      gl.shaderSource(shader, source);
      gl.compileShader(shader);

      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        console.error('Failed to compile shader', gl.getShaderInfoLog(shader));
        gl.deleteShader(shader);
        return null;
      }

      return shader;
    }

    function createProgram(vertex: string, fragment: string) {
      let vertexShader = compileShader(gl.VERTEX_SHADER, vertex);
      let fragmentShader = compileShader(gl.FRAGMENT_SHADER, fragment);

      if (!vertexShader || !fragmentShader) {
        console.error('Failed to create program');
        return null;
      }

      let program = gl.createProgram();

      if (!program) {
        console.error('Failed to create program');
        return null;
      }

      gl.attachShader(program, vertexShader);
      gl.attachShader(program, fragmentShader);
      gl.linkProgram(program);

      if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
        console.error('Failed to link program', gl.getProgramInfoLog(program));
        gl.deleteProgram(program);
        gl.deleteShader(vertexShader);
        gl.deleteShader(fragmentShader);
        return null;
      }

      gl.deleteShader(vertexShader);
      gl.deleteShader(fragmentShader);

      return program;
    }

    function initShaders() {
      // Vertex shader source
      const vertexShaderSource = `
        precision mediump float;
        attribute vec2 a_position;
        varying vec2 v_texCoord;
        void main() {
            v_texCoord = a_position * 0.5 + 0.5;
            gl_Position = vec4(a_position, 0.0, 1.0);
        }
      `;

      // Clear shader source
      const clearShaderSource = `
        precision highp float;
        precision mediump sampler2D;
        varying highp vec2 v_texCoord;
        uniform float u_value;
        void main() {
            gl_FragColor = u_value * vec4(1.0);
        }
      `;

      // Splat shader source
      const splatShaderSource = `
        precision highp float;
        precision mediump sampler2D;
        varying highp vec2 v_texCoord;
        uniform sampler2D u_texture;
        uniform float u_radius;
        uniform vec3 u_color;
        uniform vec2 u_center;
        void main() {
            vec3 c = u_color;
            float radius = u_radius;
            vec2 center = u_center;
            float dist = length(v_texCoord - center);
            float factor = exp(-dist * dist / radius);
            vec3 splat = factor * c;
            gl_FragColor = vec4(splat, 1.0);
        }
      `;

      // Advection shader source
      const advectionShaderSource = `
        precision highp float;
        precision mediump sampler2D;
        varying highp vec2 v_texCoord;
        uniform sampler2D u_velocity;
        uniform sampler2D u_density;
        uniform vec2 u_texelSize;
        uniform float u_dt;
        uniform float u_dissipation;
        void main() {
            vec2 coord = v_texCoord - u_dt * u_velocity * u_texelSize;
            gl_FragColor = u_dissipation * texture2D(u_density, coord);
        }
      `;

      // Divergence shader source
      const divergenceShaderSource = `
        precision highp float;
        precision mediump sampler2D;
        varying highp vec2 v_texCoord;
        uniform sampler2D u_velocity;
        uniform vec2 u_texelSize;
        void main() {
            float L = texture2D(u_velocity, v_texCoord - vec2(u_texelSize.x, 0.0)).x;
            float R = texture2D(u_velocity, v_texCoord + vec2(u_texelSize.x, 0.0)).x;
            float B = texture2D(u_velocity, v_texCoord - vec2(0.0, u_texelSize.y)).y;
            float T = texture2D(u_velocity, v_texCoord + vec2(0.0, u_texelSize.y)).y;
            float div = 0.5 * (R - L + T - B);
            gl_FragColor = vec4(div, 0.0, 0.0, 1.0);
        }
      `;

      // Curl shader source
      const curlShaderSource = `
        precision highp float;
        precision mediump sampler2D;
        varying highp vec2 v_texCoord;
        uniform sampler2D u_velocity;
        uniform vec2 u_texelSize;
        void main() {
            float L = texture2D(u_velocity, v_texCoord - vec2(u_texelSize.x, 0.0)).y;
            float R = texture2D(u_velocity, v_texCoord + vec2(u_texelSize.x, 0.0)).y;
            float B = texture2D(u_velocity, v_texCoord - vec2(0.0, u_texelSize.y)).x;
            float T = texture2D(u_velocity, v_texCoord + vec2(0.0, u_texelSize.y)).x;
            float curl = 0.5 * (T - B - R + L);
            gl_FragColor = vec4(curl, 0.0, 0.0, 1.0);
        }
      `;

      // Pressure shader source
      const pressureShaderSource = `
        precision highp float;
        precision mediump sampler2D;
        varying highp vec2 v_texCoord;
        uniform sampler2D u_divergence;
        uniform vec2 u_texelSize;
        void main() {
            float L = texture2D(u_divergence, v_texCoord - vec2(u_texelSize.x, 0.0)).x;
            float R = texture2D(u_divergence, v_texCoord + vec2(u_texelSize.x, 0.0)).x;
            float B = texture2D(u_divergence, v_texCoord - vec2(0.0, u_texelSize.y)).x;
            float T = texture2D(u_divergence, v_texCoord + vec2(0.0, u_texelSize.y)).x;
            float pressure = 0.25 * (L + R + B + T);
            gl_FragColor = vec4(pressure, 0.0, 0.0, 1.0);
        }
      `;

      // Gradient subtract shader source
      const gradientSubtractShaderSource = `
        precision highp float;
        precision mediump sampler2D;
        varying highp vec2 v_texCoord;
        uniform sampler2D u_pressure;
        uniform sampler2D u_velocity;
        uniform vec2 u_texelSize;
        uniform float u_dt;
        void main() {
            float L = texture2D(u_pressure, v_texCoord - vec2(u_texelSize.x, 0.0)).x;
            float R = texture2D(u_pressure, v_texCoord + vec2(u_texelSize.x, 0.0)).x;
            float B = texture2D(u_pressure, v_texCoord - vec2(0.0, u_texelSize.y)).x;
            float T = texture2D(u_pressure, v_texCoord + vec2(0.0, u_texelSize.y)).x;
            vec2 velocity = texture2D(u_velocity, v_texCoord).xy;
            velocity -= vec2(R - L, T - B);
            gl_FragColor = vec4(velocity, 0.0, 1.0);
        }
      `;

      clearProgram = createProgram(vertexShaderSource, clearShaderSource) as WebGLProgram;
      splatProgram = createProgram(vertexShaderSource, splatShaderSource) as WebGLProgram;
      advectionProgram = createProgram(vertexShaderSource, advectionShaderSource) as WebGLProgram;
      divergenceProgram = createProgram(vertexShaderSource, divergenceShaderSource) as WebGLProgram;
      curlProgram = createProgram(vertexShaderSource, curlShaderSource) as WebGLProgram;
      pressureProgram = createProgram(vertexShaderSource, pressureShaderSource) as WebGLProgram;
      gradientSubtractProgram = createProgram(vertexShaderSource, gradientSubtractShaderSource) as WebGLProgram;
    }

    function initQuad() {
      // Full screen quad vertices
      const vertices = [-1, -1, -1, 1, 1, 1, 1, -1];

      quadBuffer = gl.createBuffer() as WebGLBuffer;
      gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
      gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(vertices), gl.STATIC_DRAW);
    }

    function pointerPrototype() {
      this.id = -1;
      this.x = 0;
      this.y = 0;
      this.dx = 0;
      this.dy = 0;
      this.down = false;
      this.moved = false;
      this.color = [30, 0, 300];
    }

    function correctColor(color: { r: number; g: number; b: number }) {
      let r = color.r / 255;
      let g = color.g / 255;
      let b = color.b / 255;
      return [r, g, b];
    }

    function splat(x: number, y: number, dx: number, dy: number, color: number[]) {
      splatStack.push({ x, y, dx, dy, color });
    }

    gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);
    texelSizeX = 1 / gl.drawingBufferWidth;
    texelSizeY = 1 / gl.drawingBufferHeight;

    initializeFramebuffers();
    initShaders();
    initQuad();

    pointers.push(new (pointerPrototype as any)());

    const updatePointerDownData = (pointer: PointerPrototype, id: number, posX: number, posY: number) => {
      pointer.id = id;
      pointer.down = true;
      pointer.x = posX;
      pointer.y = posY;
      pointer.dx = 0;
      pointer.dy = 0;
    };

    const updatePointerMoveData = (pointer: PointerPrototype, posX: number, posY: number) => {
      pointer.dx = posX - pointer.x;
      pointer.dy = posY - pointer.y;
      pointer.x = posX;
      pointer.y = posY;
      pointer.moved = true;
    };

    canvas.addEventListener('mousedown', (e) => {
      const pointer = pointers[0];
      if (!pointer) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updatePointerDownData(pointer, 0, x, y);
    });

    canvas.addEventListener('mouseup', () => {
      const pointer = pointers[0];
      if (!pointer) return;

      pointer.down = false;
    });

    canvas.addEventListener('mousemove', (e) => {
      const pointer = pointers[0];
      if (!pointer) return;
      
      const rect = canvas.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      updatePointerMoveData(pointer, x, y);
    });

    canvas.addEventListener('touchstart', (e) => {
      e.preventDefault();
      const pointer = pointers[0];
      if (!pointer) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      updatePointerDownData(pointer, 0, x, y);
    }, { passive: false });

    canvas.addEventListener('touchend', (e) => {
      e.preventDefault();
      const pointer = pointers[0];
      if (!pointer) return;

      pointer.down = false;
    }, { passive: false });

    canvas.addEventListener('touchmove', (e) => {
      e.preventDefault();
      const pointer = pointers[0];
      if (!pointer) return;

      const rect = canvas.getBoundingClientRect();
      const x = e.touches[0].clientX - rect.left;
      const y = e.touches[0].clientY - rect.top;
      updatePointerMoveData(pointer, x, y);
    }, { passive: false });

    let lastTime = Date.now();
    let colorCounter = 0;

    const animate = () => {
      const dt = Math.min((Date.now() - lastTime) / 1000, 0.016);
      lastTime = Date.now();

      gl.viewport(0, 0, gl.drawingBufferWidth, gl.drawingBufferHeight);

      // Update colors
      colorCounter += COLOR_UPDATE_SPEED * dt;

      pointers.forEach((pointer, i) => {
        if (pointer.down) {
          splat(pointer.x / gl.drawingBufferWidth, 1 - pointer.y / gl.drawingBufferHeight, pointer.dx, pointer.dy, pointer.color);
        }
      });

      // Advection
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      gl.useProgram(advectionProgram);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'u_velocity'), 0);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'u_density'), 1);
      gl.uniform2f(gl.getUniformLocation(advectionProgram, 'u_texelSize'), texelSizeX, texelSizeY);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'u_dt'), dt);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'u_dissipation'), VELOCITY_DISSIPATION);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      velocity.swap();

      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
      gl.useProgram(advectionProgram);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'u_velocity'), 0);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'u_density'), 1);
      gl.uniform2f(gl.getUniformLocation(advectionProgram, 'u_texelSize'), texelSizeX, texelSizeY);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'u_dt'), dt);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'u_dissipation'), DENSITY_DISSIPATION);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      density.swap();

      // Splatting
      if (splatStack.length > 0) {
        for (let m = 0; m < splatStack.length; m++) {
          const splatData = splatStack.pop();
          if (!splatData) continue;
          gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
          gl.useProgram(splatProgram);
          gl.uniform1i(gl.getUniformLocation(splatProgram, 'u_texture'), 0);
          gl.uniform2f(gl.getUniformLocation(splatProgram, 'u_center'), splatData.x, splatData.y);
          gl.uniform3f(gl.getUniformLocation(splatProgram, 'u_color'), splatData.color[0], splatData.color[1], splatData.color[2]);
          gl.uniform1f(gl.getUniformLocation(splatProgram, 'u_radius'), SPLAT_RADIUS);
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
          gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
          density.swap();
        }
      }

      // Curl
      gl.bindFramebuffer(gl.FRAMEBUFFER, curlFBO);
      gl.useProgram(curlProgram);
      gl.uniform1i(gl.getUniformLocation(curlProgram, 'u_velocity'), 0);
      gl.uniform2f(gl.getUniformLocation(curlProgram, 'u_texelSize'), texelSizeX, texelSizeY);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      // Divergence
      gl.bindFramebuffer(gl.FRAMEBUFFER, divergenceFBO);
      gl.useProgram(divergenceProgram);
      gl.uniform1i(gl.getUniformLocation(divergenceProgram, 'u_velocity'), 0);
      gl.uniform2f(gl.getUniformLocation(divergenceProgram, 'u_texelSize'), texelSizeX, texelSizeY);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      // Pressure
      for (let i = 0; i < PRESSURE_ITERATIONS; i++) {
        gl.bindFramebuffer(gl.FRAMEBUFFER, pressure.write.fbo);
        gl.useProgram(pressureProgram);
        gl.uniform1i(gl.getUniformLocation(pressureProgram, 'u_divergence'), 0);
        gl.uniform2f(gl.getUniformLocation(pressureProgram, 'u_texelSize'), texelSizeX, texelSizeY);
        gl.activeTexture(gl.TEXTURE0);
        gl.bindTexture(gl.TEXTURE_2D, divergence.texture);
        gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
        pressure.swap();
      }

      // Gradient Subtract
      gl.bindFramebuffer(gl.FRAMEBUFFER, velocity.write.fbo);
      gl.useProgram(gradientSubtractProgram);
      gl.uniform1i(gl.getUniformLocation(gradientSubtractProgram, 'u_pressure'), 0);
      gl.uniform1i(gl.getUniformLocation(gradientSubtractProgram, 'u_velocity'), 1);
      gl.uniform2f(gl.getUniformLocation(gradientSubtractProgram, 'u_texelSize'), texelSizeX, texelSizeY);
      gl.uniform1f(gl.getUniformLocation(gradientSubtractProgram, 'u_dt'), dt);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, pressure.read.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      velocity.swap();

      // Render to canvas
      gl.bindFramebuffer(gl.FRAMEBUFFER, null);
      gl.useProgram(advectionProgram);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'u_velocity'), 0);
      gl.uniform1i(gl.getUniformLocation(advectionProgram, 'u_density'), 1);
      gl.uniform2f(gl.getUniformLocation(advectionProgram, 'u_texelSize'), texelSizeX, texelSizeY);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'u_dt'), dt);
      gl.uniform1f(gl.getUniformLocation(advectionProgram, 'u_dissipation'), 1.0);
      gl.activeTexture(gl.TEXTURE0);
      gl.bindTexture(gl.TEXTURE_2D, velocity.read.texture);
      gl.activeTexture(gl.TEXTURE1);
      gl.bindTexture(gl.TEXTURE_2D, density.read.texture);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);

      requestAnimationFrame(animate);
    };

    // Set up GLSL
    gl.clearColor(BACK_COLOR.r, BACK_COLOR.g, BACK_COLOR.b, 1.0);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);

    // Clear Texture
    function clear(value: number) {
      gl.bindFramebuffer(gl.FRAMEBUFFER, density.write.fbo);
      gl.useProgram(clearProgram);
      gl.uniform1f(gl.getUniformLocation(clearProgram, 'u_value'), value);
      gl.drawArrays(gl.TRIANGLE_FAN, 0, 4);
      density.swap();
    }

    // Attach data to quad
    gl.bindBuffer(gl.ARRAY_BUFFER, quadBuffer);
    gl.vertexAttribPointer(gl.getAttribLocation(clearProgram, 'a_position'), 2, gl.FLOAT, false, 0, 0);
    gl.enableVertexAttribArray(gl.getAttribLocation(clearProgram, 'a_position'));

    // Start
    clear(TRANSPARENT ? 0 : 1);
    animate();

    // Cleanup
    return () => {
      gl.deleteTexture(density.read.texture);
      gl.deleteTexture(density.write.texture);
      gl.deleteFramebuffer(density.read.fbo);
      gl.deleteFramebuffer(density.write.fbo);

      gl.deleteTexture(velocity.read.texture);
      gl.deleteTexture(velocity.write.texture);
      gl.deleteFramebuffer(velocity.read.fbo);
      gl.deleteFramebuffer(velocity.write.fbo);

      gl.deleteTexture(divergence.texture);
      gl.deleteFramebuffer(divergence.fbo);

      gl.deleteTexture(curl.texture);
      gl.deleteFramebuffer(curl.fbo);

      gl.deleteTexture(pressure.read.texture);
      gl.deleteTexture(pressure.write.texture);
      gl.deleteFramebuffer(pressure.read.fbo);
      gl.deleteFramebuffer(pressure.write.fbo);

      gl.deleteProgram(clearProgram);
      gl.deleteProgram(splatProgram);
      gl.deleteProgram(advectionProgram);
      gl.deleteProgram(divergenceProgram);
      gl.deleteProgram(curlProgram);
      gl.deleteProgram(pressureProgram);
      gl.deleteProgram(gradientSubtractProgram);

      gl.deleteBuffer(quadBuffer);
    };
  }, [SPLAT_RADIUS, SPLAT_FORCE, DENSITY_DISSIPATION, VELOCITY_DISSIPATION, PRESSURE, PRESSURE_ITERATIONS, CURL, TRANSPARENT, BACK_COLOR, COLOR_UPDATE_SPEED]);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
};

export default SplashCursor;
