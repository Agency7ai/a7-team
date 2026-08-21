# Chunk Spritesheet

## Current Status

This directory contains a **placeholder spritesheet** generated programmatically.

## Replace with Actual Asset

The actual Chunk spritesheet should be saved here as `spritesheet.webp`.

### Specifications

- **Dimensions**: 1536×1872 pixels
- **Grid**: 8 columns × 9 rows
- **Cell size**: 192×208 pixels
- **Format**: WebP

### Animation Rows (0-indexed)

| Row | Animation | Frames |
|-----|-----------|--------|
| 0 | Idle | 6 |
| 1 | Running Right | 8 |
| 2 | Running Left | 8 |
| 3 | Waving | 4 |
| 4 | Jumping | 5 |
| 5 | Failed | 8 |
| 6 | Waiting | 6 |
| 7 | Working | 6 |
| 8 | Review | 6 |

### Current Usage

The crawler currently uses:
- Row 0 (idle) - when reduced motion is enabled or at rest
- Row 1 (running right) - when moving right
- Row 2 (running left) - when moving left
- Row 3 (waving) - briefly when reaching an edge before turning

To replace the placeholder:
1. Save the actual Chunk spritesheet as `spritesheet.webp` in this directory
2. Rebuild the site with `npm run build`
3. The crawler will automatically use the real spritesheet
