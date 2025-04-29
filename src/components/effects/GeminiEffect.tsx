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

    const setCanvasSize = () => {
      const dpr = window.devicePixelRatio || 1;
      canvas.width = canvas.offsetWidth * dpr;
      canvas.height = canvas.offsetHeight * dpr;
      ctx.scale(dpr, dpr);
      
      createPoints();
    };

    const createPoints = () => {
      const pointCount = Math.min(150, Math.floor((canvas.width * canvas.height) / 12000));
      const points: Point[] = [];
      
      for (let i = 0; i < pointCount; i++) {
        points.push({
          x: Math.random() * canvas.offsetWidth,
          y: Math.random() * canvas.offsetHeight,
          vx: (Math.random() - 0.5) * 0.2,
          vy: (Math.random() - 0.5) * 0.2,
          opacity: 0.3 + Math.random() * 0.4
        });
      }
      
      pointsRef.current = points;
    };
    
    setCanvasSize();
    window.addEventListener('resize', setCanvasSize);
    
    const animate = () => {
      const points = pointsRef.current;
      const connectionDistance = Math.min(canvas.offsetWidth, canvas.offsetHeight) * 0.15;
      const lines: Line[] = [];
      
      points.forEach(point => {
        point.x += point.vx;
        point.y += point.vy;
        
        if (point.x < 0 || point.x > canvas.offsetWidth) point.vx *= -1;
        if (point.y < 0 || point.y > canvas.offsetHeight) point.vy *= -1;
        
        point.x = Math.max(0, Math.min(canvas.offsetWidth, point.x));
        point.y = Math.max(0, Math.min(canvas.offsetHeight, point.y));
      });
      
      for (let i = 0; i < points.length; i++) {
        for (let j = i + 1; j < points.length; j++) {
          const dx = points[i].x - points[j].x;
          const dy = points[i].y - points[j].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < connectionDistance) {
            const opacity = (1 - distance / connectionDistance) * 0.25 * 
                            points[i].opacity * points[j].opacity;
            
            lines.push({
              start: points[i],
              end: points[j],
              opacity,
              width: Math.max(0.6, 1.2 * (1 - distance / connectionDistance))
            });
          }
        }
      }
      
      linesRef.current = lines;
      
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      lines.forEach(line => {
        ctx.beginPath();
        ctx.moveTo(line.start.x, line.start.y);
        ctx.lineTo(line.end.x, line.end.y);
        
        const gradient = ctx.createLinearGradient(
          line.start.x, line.start.y, 
          line.end.x, line.end.y
        );
        
        const baseColor = '155, 135, 245';
        gradient.addColorStop(0, `rgba(${baseColor}, ${line.opacity})`);
        gradient.addColorStop(1, `rgba(${baseColor}, ${line.opacity * 0.7})`);
        
        ctx.strokeStyle = gradient;
        ctx.lineWidth = line.width;
        ctx.stroke();
      });
      
      points.forEach(point => {
        ctx.beginPath();
        ctx.arc(point.x, point.y, 1.5, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(155, 135, 245, ${point.opacity})`;
        ctx.fill();
      });
      
      requestRef.current = requestAnimationFrame(animate);
    };
    
    requestRef.current = requestAnimationFrame(animate);
    
    return () => {
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      window.removeEventListener('resize', setCanvasSize);
    };
  }, []);

  return (
    <canvas 
      ref={canvasRef} 
      className="absolute inset-0 w-full h-full"
      style={{
        width: '100%',
        height: '100%',
        opacity: 1,
        willChange: 'transform',
        zIndex: 0
      }}
    />
  );
};

export default GeminiEffect;
