import { useRef, useEffect, useState, useCallback } from 'react';
import { Button } from '@/components/ui/button';
import { Eraser } from 'lucide-react';

interface SignaturePadProps {
  onSign: (signatureData: string) => void;
  onCancel: () => void;
}

export default function SignaturePad({ onSign, onCancel }: SignaturePadProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [hasDrawn, setHasDrawn] = useState(false);

  const getCtx = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return null;
    return canvas.getContext('2d');
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    // Set canvas size
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    ctx.scale(2, 2);
    ctx.strokeStyle = '#1A1A1A';
    ctx.lineWidth = 2;
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
  }, []);

  function getPosition(e: React.TouchEvent | React.MouseEvent) {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    const rect = canvas.getBoundingClientRect();

    if ('touches' in e) {
      return {
        x: e.touches[0].clientX - rect.left,
        y: e.touches[0].clientY - rect.top,
      };
    }
    return {
      x: (e as React.MouseEvent).clientX - rect.left,
      y: (e as React.MouseEvent).clientY - rect.top,
    };
  }

  function startDrawing(e: React.TouchEvent | React.MouseEvent) {
    e.preventDefault();
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPosition(e);
    ctx.beginPath();
    ctx.moveTo(pos.x, pos.y);
    setIsDrawing(true);
    setHasDrawn(true);
  }

  function draw(e: React.TouchEvent | React.MouseEvent) {
    e.preventDefault();
    if (!isDrawing) return;
    const ctx = getCtx();
    if (!ctx) return;
    const pos = getPosition(e);
    ctx.lineTo(pos.x, pos.y);
    ctx.stroke();
  }

  function stopDrawing() {
    setIsDrawing(false);
  }

  function clearSignature() {
    const canvas = canvasRef.current;
    const ctx = getCtx();
    if (!canvas || !ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setHasDrawn(false);
  }

  function handleAccept() {
    const canvas = canvasRef.current;
    if (!canvas || !hasDrawn) return;
    const data = canvas.toDataURL('image/png');
    onSign(data);
  }

  return (
    <div className="space-y-4">
      <p className="text-sm text-[var(--narrative-text-secondary)] text-center">
        Sign below to confirm your treatment plan
      </p>

      {/* Canvas */}
      <div className="relative rounded-xl border-2 border-dashed border-[var(--narrative-border)] bg-white overflow-hidden">
        <canvas
          ref={canvasRef}
          className="w-full h-48 touch-none cursor-crosshair"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseLeave={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {!hasDrawn && (
          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <span className="text-gray-300 text-lg font-light italic">Sign here</span>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex items-center justify-between">
        <button
          onClick={clearSignature}
          className="flex items-center gap-1.5 text-sm text-[var(--narrative-text-secondary)] hover:text-[var(--narrative-text)] transition"
        >
          <Eraser className="w-4 h-4" />
          Clear
        </button>
        <div className="flex gap-3">
          <Button variant="ghost" onClick={onCancel}>
            Cancel
          </Button>
          <Button
            onClick={handleAccept}
            disabled={!hasDrawn}
            className="bg-narrative-gold hover:bg-narrative-gold-light text-white"
          >
            Accept & Sign
          </Button>
        </div>
      </div>
    </div>
  );
}
