# Chunk Crawler Implementation

## Summary

Successfully added Chunk, the sticky footer crawler, to the a7.team Next.js site. The implementation preserves the WebGL stacking fix and adds the crawler on top of that branch as requested.

## What Was Done

### 1. Component Implementation (`components/chunk-crawler.tsx`)
- Client-side React component using canvas for sprite rendering
- Sprite configuration matching the Codex v1 atlas specifications:
  - Sheet: 1536×1872px (8 cols × 9 rows)
  - Cell: 192×208px
  - Display: 72×78px
- Animation states: idle, running-right, running-left, waving
- Patrol behavior with edge detection and turn-around logic
- Reduced motion support (pauses on idle frame)
- Pixelated rendering with `image-rendering: pixelated`

### 2. Layout Integration (`app/layout.tsx`)
- Added ChunkCrawler to root layout
- Appears sitewide (both `/` and `/about` pages)
- Positioned as fixed footer element

### 3. Positioning & Stacking
- `position: fixed` at bottom: 0
- `z-index: 50` (between UI layer at z:1 and theme toggle at z:100)
- `pointer-events: none` ensures no click blocking
- WebGL canvas remains at `z-index: -1` (stacking fix preserved)

### 4. Asset Generation
- Created placeholder spritesheet at `public/pets/chunk/spritesheet.webp`
- Generated programmatically with Sharp (53KB WebP)
- Script available at `scripts/generate-placeholder-spritesheet.js`
- Documentation at `public/pets/chunk/README.md` for replacement instructions

## Technical Details

### Animation Configuration
```typescript
rows: {
  idle: 0,          // 6 frames
  runningRight: 1,  // 8 frames
  runningLeft: 2,   // 8 frames
  waving: 3,        // 4 frames
  jumping: 4,       // 5 frames
  failed: 5,        // 8 frames
  waiting: 6,       // 6 frames
  working: 7,       // 6 frames
  review: 8         // 6 frames
}
```

### Behavior
- Speed: ~1.15px per 110ms tick
- Edge padding: 20px
- Turns around at viewport edges with wave animation
- Continuous patrol between left and right boundaries

### Browser Support
- Respects `prefers-reduced-motion: reduce`
- Canvas 2D API for sprite rendering
- Automatic resize handling
- Image loading state management

## Build Status

✅ `npm run build` succeeds
- All pages compile correctly
- TypeScript checks pass
- Static export generates successfully

## Testing Checklist

- ✅ Theme toggle remains clickable (z-index hierarchy)
- ✅ Navigation links remain clickable (pointer-events: none)
- ✅ Component renders on homepage (/)
- ✅ Component renders on about page (/about)
- ✅ WebGL stacking fix preserved (canvas at z-index -1)
- ✅ Build completes without errors
- ✅ Reduced motion support implemented

## Git History

Branch: `feat/chunk-crawler`
- Starts from `07c7fe0` (WebGL stacking fix)
- Commits:
  1. `f378c85` - Add Chunk crawler to footer
  2. `044664a` - Add documentation for Chunk spritesheet replacement

## Pull Request

**PR #6**: https://github.com/Agency7ai/a7-team/pull/6
- Status: Draft (as requested)
- Base: `main`
- Ready for preview on Cloudflare Pages

## Next Steps

1. **Preview**: Deploy to Cloudflare Pages to see Chunk in action
2. **Asset Replacement**: Replace placeholder spritesheet with actual Codex atlas
   - Save real spritesheet as `public/pets/chunk/spritesheet.webp`
   - Rebuild with `npm run build`
3. **Review**: Preview on Pages URL before merging to main (DO NOT MERGE yet)

## Notes

- Placeholder spritesheet shows basic pixel bot with cyan equalizer bars
- Real Codex atlas should maintain exact same dimensions and cell layout
- No Elena Rostova or other pets included (as specified)
- No homepage copy or editorial design changes
- Footer crawler design complements existing technical aesthetic
