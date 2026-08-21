'use client';

import { useEffect, useRef, useState } from 'react';

interface ChunkState {
  x: number;
  frame: number;
  direction: 'left' | 'right';
  state: 'running' | 'idle' | 'wave';
}

const SPRITE_CONFIG = {
  sheetWidth: 1536,
  sheetHeight: 1872,
  cols: 8,
  rowCount: 9,
  cellWidth: 192,
  cellHeight: 208,
  displayWidth: 72,
  displayHeight: 78,
  rows: {
    idle: 0,
    runningRight: 1,
    runningLeft: 2,
    waving: 3,
    jumping: 4,
    failed: 5,
    waiting: 6,
    working: 7,
    review: 8,
  },
  frameCounts: {
    idle: 6,
    runningRight: 8,
    runningLeft: 8,
    waving: 4,
    jumping: 5,
    failed: 8,
    waiting: 6,
    working: 6,
    review: 6,
  },
};

export default function ChunkCrawler() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const stateRef = useRef<ChunkState>({
    x: 100,
    frame: 0,
    direction: 'right',
    state: 'running',
  });
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
    setPrefersReducedMotion(mediaQuery.matches);

    const handleChange = (e: MediaQueryListEvent) => {
      setPrefersReducedMotion(e.matches);
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const img = new Image();
    img.src = '/pets/chunk/spritesheet.webp';
    imageRef.current = img;

    const state = stateRef.current;
    const speed = 1.15;
    const edgePadding = 20;
    let animationFrameId: number;
    let lastTime = 0;
    const tickInterval = 110;

    const getFrameCount = (currentState: ChunkState['state'], direction: ChunkState['direction']) => {
      if (currentState === 'running') {
        return direction === 'right' 
          ? SPRITE_CONFIG.frameCounts.runningRight 
          : SPRITE_CONFIG.frameCounts.runningLeft;
      }
      if (currentState === 'idle') return SPRITE_CONFIG.frameCounts.idle;
      if (currentState === 'wave') return SPRITE_CONFIG.frameCounts.waving;
      return SPRITE_CONFIG.frameCounts.runningRight;
    };

    const getRow = (currentState: ChunkState['state'], direction: ChunkState['direction']) => {
      if (currentState === 'running') {
        return direction === 'right' 
          ? SPRITE_CONFIG.rows.runningRight 
          : SPRITE_CONFIG.rows.runningLeft;
      }
      if (currentState === 'idle') return SPRITE_CONFIG.rows.idle;
      if (currentState === 'wave') return SPRITE_CONFIG.rows.waving;
      return SPRITE_CONFIG.rows.runningRight;
    };

    const update = (timestamp: number) => {
      if (!canvas || !ctx || !imageRef.current || !imageRef.current.complete) {
        animationFrameId = requestAnimationFrame(update);
        return;
      }

      if (prefersReducedMotion) {
        ctx.imageSmoothingEnabled = false;
        ctx.clearRect(0, 0, canvas.width, canvas.height);
        
        const row = SPRITE_CONFIG.rows.idle;
        const sx = 0;
        const sy = row * SPRITE_CONFIG.cellHeight;
        
        ctx.drawImage(
          imageRef.current,
          sx,
          sy,
          SPRITE_CONFIG.cellWidth,
          SPRITE_CONFIG.cellHeight,
          state.x,
          canvas.height - SPRITE_CONFIG.displayHeight,
          SPRITE_CONFIG.displayWidth,
          SPRITE_CONFIG.displayHeight
        );
        
        return;
      }

      const deltaTime = timestamp - lastTime;

      if (deltaTime >= tickInterval) {
        lastTime = timestamp;

        if (state.state === 'running') {
          if (state.direction === 'right') {
            state.x += speed;
            if (state.x >= canvas.width - SPRITE_CONFIG.displayWidth - edgePadding) {
              state.x = canvas.width - SPRITE_CONFIG.displayWidth - edgePadding;
              state.state = 'wave';
              state.frame = 0;
            }
          } else {
            state.x -= speed;
            if (state.x <= edgePadding) {
              state.x = edgePadding;
              state.state = 'wave';
              state.frame = 0;
            }
          }
        } else if (state.state === 'wave' || state.state === 'idle') {
          const frameCount = getFrameCount(state.state, state.direction);
          if (state.frame >= frameCount - 1) {
            state.state = 'running';
            state.direction = state.direction === 'right' ? 'left' : 'right';
            state.frame = 0;
          }
        }

        const frameCount = getFrameCount(state.state, state.direction);
        state.frame = (state.frame + 1) % frameCount;
      }

      ctx.imageSmoothingEnabled = false;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const row = getRow(state.state, state.direction);
      const sx = state.frame * SPRITE_CONFIG.cellWidth;
      const sy = row * SPRITE_CONFIG.cellHeight;

      ctx.drawImage(
        imageRef.current,
        sx,
        sy,
        SPRITE_CONFIG.cellWidth,
        SPRITE_CONFIG.cellHeight,
        state.x,
        canvas.height - SPRITE_CONFIG.displayHeight,
        SPRITE_CONFIG.displayWidth,
        SPRITE_CONFIG.displayHeight
      );

      animationFrameId = requestAnimationFrame(update);
    };

    const resize = () => {
      if (!canvas) return;
      canvas.width = window.innerWidth;
      canvas.height = SPRITE_CONFIG.displayHeight + 10;
    };

    resize();
    window.addEventListener('resize', resize);

    img.onload = () => {
      animationFrameId = requestAnimationFrame(update);
    };

    if (img.complete) {
      animationFrameId = requestAnimationFrame(update);
    }

    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [prefersReducedMotion]);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: 'fixed',
        bottom: 0,
        left: 0,
        width: '100%',
        height: `${SPRITE_CONFIG.displayHeight + 10}px`,
        zIndex: 50,
        pointerEvents: 'none',
        imageRendering: 'pixelated',
      }}
    />
  );
}
