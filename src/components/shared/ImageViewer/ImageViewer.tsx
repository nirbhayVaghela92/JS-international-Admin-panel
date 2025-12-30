/* eslint-disable @typescript-eslint/no-explicit-any */
import { Dialog, DialogContent } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { useState, useRef, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, ZoomIn, ZoomOut, RotateCcw } from "lucide-react";

interface ImageGalleryProps {
  open: boolean;
  setOpen: (open: boolean) => void;
  image?: any;
  images?: any[];
  initialIndex?: number;
}

export function ImageGallery({ 
  open, 
  setOpen, 
  image, 
  images = [], 
  initialIndex = 0 
}: ImageGalleryProps) {
  const [currentIndex, setCurrentIndex] = useState(initialIndex);
  const [scale, setScale] = useState(1);
  const [position, setPosition] = useState({ x: 0, y: 0 });
  const [isDragging, setIsDragging] = useState(false);
  const [dragStart, setDragStart] = useState({ x: 0, y: 0 });
  const imageRef = useRef<HTMLImageElement>(null);

  // Combine single image with optional multiple images
  const allImages = [image, ...images].filter(Boolean);

  const nextImage = () => {
    setCurrentIndex((i) => (i + 1) % allImages.length);
    resetZoom();
  };
  
  const prevImage = () => {
    setCurrentIndex((i) => (i - 1 + allImages.length) % allImages.length);
    resetZoom();
  };

  const hasMultipleImages = allImages.length > 1;

  const handleClose = () => {
    setOpen(false);
    setCurrentIndex(initialIndex);
    resetZoom();
  };

  const resetZoom = () => {
    setScale(1);
    setPosition({ x: 0, y: 0 });
  };

  const zoomIn = () => {
    setScale(prev => Math.min(prev * 1.5, 5)); // Max zoom 5x
  };

  const zoomOut = () => {
    setScale(prev => Math.max(prev / 1.5, 0.5)); // Min zoom 0.5x
  };

  // Handle mouse wheel zoom
  const handleWheel = (e: React.WheelEvent) => {
    e.preventDefault();
    const delta = e.deltaY > 0 ? 0.9 : 1.1;
    setScale(prev => Math.min(Math.max(prev * delta, 0.5), 5));
  };

  // Handle mouse drag for panning
  const handleMouseDown = (e: React.MouseEvent) => {
    if (scale > 1) {
      setIsDragging(true);
      setDragStart({
        x: e.clientX - position.x,
        y: e.clientY - position.y
      });
    }
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (isDragging && scale > 1) {
      setPosition({
        x: e.clientX - dragStart.x,
        y: e.clientY - dragStart.y
      });
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  // Reset zoom when dialog opens/closes or image changes
  useEffect(() => {
    if (!open) {
      resetZoom();
    }
  }, [open]);

  // Handle keyboard shortcuts
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!open) return;
      
      switch (e.key) {
        case 'Escape':
          handleClose();
          break;
        case '+':
        case '=':
          e.preventDefault();
          zoomIn();
          break;
        case '-':
          e.preventDefault();
          zoomOut();
          break;
        case '0':
          e.preventDefault();
          resetZoom();
          break;
        case 'ArrowLeft':
          if (hasMultipleImages) prevImage();
          break;
        case 'ArrowRight':
          if (hasMultipleImages) nextImage();
          break;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [open, hasMultipleImages]);
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogContent 
        className="max-w-[95vw] max-h-[95vh] w-[95vw] h-[95vh] p-0 bg-black/90 border-none"
        onInteractOutside={(e) => e.preventDefault()}
      >
        <div 
          className={`relative flex justify-center items-center w-full h-full overflow-hidden ${
            scale > 1 ? (isDragging ? 'cursor-grabbing' : 'cursor-grab') : 'cursor-default'
          }`}
          onWheel={handleWheel}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {/* Control Panel */}
          <div className="absolute top-4 right-4 z-10 flex gap-1 bg-black/70 rounded p-1">
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomOut}
              className="h-8 w-8 p-0 text-white hover:bg-white/10"
            >
              <ZoomOut size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={resetZoom}
              className="h-8 w-8 p-0 text-white hover:bg-white/10"
            >
              <RotateCcw size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={zoomIn}
              className="h-8 w-8 p-0 text-white hover:bg-white/10"
            >
              <ZoomIn size={20} />
            </Button>
            
            <Button
              variant="ghost"
              size="sm"
              onClick={handleClose}
              className="h-8 w-8 p-0 text-white hover:bg-white/10"
            >
              <X size={20} />
            </Button>
          </div>

          {/* Previous Button - Only show if multiple images */}
          {hasMultipleImages && (
            <Button
              variant="ghost"
              size="sm"
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 p-0 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronLeft size={24} />
            </Button>
          )}

          {/* Main Image */}
          <img
            ref={imageRef}
            src={allImages[currentIndex]}
            alt="Large View"
            className={`rounded select-none pointer-events-none ${
              scale === 1 ? 'max-w-full max-h-[80vh] object-contain' : ''
            } ${isDragging ? '' : 'transition-transform duration-200 ease-out'}`}
            style={{
              transform: `scale(${scale}) translate(${position.x / scale}px, ${position.y / scale}px)`,
              maxWidth: scale === 1 ? '100%' : 'none',
              maxHeight: scale === 1 ? '80vh' : 'none',
              objectFit: scale === 1 ? 'contain' : 'initial'
            }}
            draggable={false}
          />

          {/* Next Button - Only show if multiple images */}
          {hasMultipleImages && (
            <Button
              variant="ghost"
              size="sm"
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 z-10 h-12 w-12 p-0 bg-black/50 text-white hover:bg-black/70"
            >
              <ChevronRight size={24} />
            </Button>
          )}

          {/* Image Counter and Zoom Level */}
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-black/70 px-4 py-1 rounded-full text-white flex gap-2 items-center">
            {hasMultipleImages && (
              <span className="text-sm">
                {currentIndex + 1} / {allImages.length}
              </span>
            )}
            {hasMultipleImages && scale !== 1 && (
              <span className="text-sm opacity-70">•</span>
            )}
            {scale !== 1 && (
              <span className="text-sm">
                {Math.round(scale * 100)}%
              </span>
            )}
          </div>
          
          {/* Instructions - Show briefly when dialog opens */}
          {scale === 1 && (
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 translate-y-24 bg-black/70 px-4 py-2 rounded text-white opacity-70 pointer-events-none">
              <p className="text-xs text-center">
                Mouse wheel or +/- to zoom • Drag to pan when zoomed • Press 0 to reset
              </p>
            </div>
          )}
        </div>
      </DialogContent>
    </Dialog>
  );
}