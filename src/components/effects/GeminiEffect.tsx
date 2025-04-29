import React, { useEffect, useRef } from 'react';

interface Point {
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
}

interface Line {
  start: Point;
  end: Point;
  opacity: number;
  width: number;
}

const GeminiEffect: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const requestRef = useRef<number>();
  const pointsRef = useRef<Point[]>([]);
  const linesRef = useRef<Line[]>([]);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      const dpr = window.devicePixelRatio || 1;
      const rect = canvas.getBoundingClientRect();
      
      canvas.width = rect.width * dpr;
      canvas.height = rect.height * dpr;
      
      ctx.scale(dpr, dpr);
      
      // Recreate points after resize
      createPoints();
    };

    // Initialize on mount
    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    // Create points
    const createPoints = () => {
      const points: Point[] = [];
      const pointCount = Math.min(100, Math.floor(canvas.width * canvas.height / 15000));
      
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          vx: (Math.random() - 0.5) * 0.3,
          vy: (Math.random() - 0.5) * 0.3,
          opacity: 0.2 + Math.random() * 0.3,
        });
      }
      
      pointsRef.current = points;
    };
    
    createPoints();
    
    const animatePoints = () => {
      const points = pointsRef.current;
      const connectionDistance = Math.min(canvas.width, canvas.height) * 0.15;
      const lines: Line[] = [];
      
      // Update points
      points.forEach(point => {
        // Move points
        point.x += point.vx;
        point.y += point.vy;
        
        // Bounce off edges with normalized coordinates
        if (point.x < 0 || point.x > rect.width) point.vx *= -1;
        if (point.y < 0 || point.y > rect.height) point.vy *= -1;
        
        // Keep points in bounds
        point.x = Math.max(0, Math.min(rect.width, point.x));
        point.y = Math.max(0, Math.min(rect.height, point.y));
      });
      
      // Create connections between points
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.2 * 
                            points[i].opacity * points[j].opacity;
            
            lines.push({
              start: points[i],
              end: points[j],
              opacity,
              width: 0.8 * (1 - distance / connectionDistance)
            });
          }
        }
      }
      
      linesRef.current = lines;
    };
    
    const rect = canvas.getBoundingClientRect();

    const render = () => {
      ctx.clearRect(0, 0, rect.width, rect.height);
      
      // Draw lines
      linesRef.current.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        
        // Create gradient for line
        const gradient = ctx.createLinearGradient(
          line.start.x, line.start.y, 
          line.end.x, line.end.y
        );

        const baseColor = '155, 135, 245'; // NextGen purple color
        gradient.addColorStop(0, `rgba(${baseColor}, ${line.opacity})`);
        gradient.addColorStop(1, `rgba(${baseColor}, ${line.opacity * 0.5})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });
      
      // Draw points
      pointsRef.current.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.2, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 135, 245, ${point.opacity})`;
        ctx.fill();
      });
    };

    const animate = () => {
      animatePoints();
      render();
      requestRef.current = requestAnimationFrame(animate);
    };

    requestRef.current = requestAnimationFrame(animate);

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full -z-10"
      style={{ 
        width: '100%', 
        height: '100%', 
        display: 'block',
        willChange: 'transform', 
        opacity: 1 
      }}
    />
  );
};

export default GeminiEffect;
