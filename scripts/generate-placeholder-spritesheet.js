const sharp = require('sharp');
const fs = require('fs');
const path = require('path');

const WIDTH = 1536;
const HEIGHT = 1872;
const COLS = 8;
const ROWS = 9;
const CELL_WIDTH = 192;
const CELL_HEIGHT = 208;

async function generatePlaceholder() {
  const svg = `
    <svg width="${WIDTH}" height="${HEIGHT}" xmlns="http://www.w3.org/2000/svg">
      <defs>
        <style>
          .cell { fill: #2a2a2a; stroke: #444; stroke-width: 2; }
          .screen { fill: #06103A; }
          .bar { fill: #00d9ff; }
          .leg { fill: #555; }
        </style>
      </defs>
      ${Array.from({ length: ROWS }).map((_, row) => 
        Array.from({ length: COLS }).map((_, col) => {
          const x = col * CELL_WIDTH;
          const y = row * CELL_HEIGHT;
          const centerX = x + CELL_WIDTH / 2;
          const centerY = y + CELL_HEIGHT / 2;
          
          const bodySize = 80;
          const bodyX = centerX - bodySize / 2;
          const bodyY = centerY - bodySize / 2 - 10;
          
          const screenSize = 50;
          const screenX = centerX - screenSize / 2;
          const screenY = bodyY + 15;
          
          const barWidth = 4;
          const barSpacing = 6;
          const numBars = 5;
          const totalWidth = numBars * barWidth + (numBars - 1) * barSpacing;
          const barsX = centerX - totalWidth / 2;
          const barsY = screenY + screenSize / 2 - 15;
          
          const frameOffset = col * 5;
          
          return `
            <g>
              <rect class="cell" x="${x}" y="${y}" width="${CELL_WIDTH}" height="${CELL_HEIGHT}" rx="4"/>
              
              <rect x="${bodyX}" y="${bodyY}" width="${bodySize}" height="${bodySize}" fill="#3a3a3a" rx="4"/>
              
              <rect class="screen" x="${screenX}" y="${screenY}" width="${screenSize}" height="${screenSize}" rx="2"/>
              
              ${Array.from({ length: numBars }).map((_, i) => {
                const height = 10 + ((i + frameOffset) % 5) * 4;
                return `<rect class="bar" x="${barsX + i * (barWidth + barSpacing)}" y="${barsY + (20 - height)}" width="${barWidth}" height="${height}"/>`;
              }).join('')}
              
              <rect class="leg" x="${centerX - 30}" y="${bodyY + bodySize}" width="8" height="20" rx="2"/>
              <rect class="leg" x="${centerX + 22}" y="${bodyY + bodySize}" width="8" height="20" rx="2"/>
              <rect class="leg" x="${centerX - 20}" y="${bodyY + bodySize}" width="8" height="20" rx="2"/>
              <rect class="leg" x="${centerX + 12}" y="${bodyY + bodySize}" width="8" height="20" rx="2"/>
            </g>
          `;
        }).join('')
      ).join('')}
    </svg>
  `;

  const outputDir = path.join(__dirname, '..', 'public', 'pets', 'chunk');
  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  await sharp(Buffer.from(svg))
    .webp({ quality: 90 })
    .toFile(path.join(outputDir, 'spritesheet.webp'));

  console.log('✓ Generated placeholder spritesheet at public/pets/chunk/spritesheet.webp');
  console.log('  Replace this with the actual Chunk spritesheet from the attachments.');
}

generatePlaceholder().catch(console.error);
