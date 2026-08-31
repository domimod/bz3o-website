#!/usr/bin/env node

import sharp from 'sharp';
import { mkdir } from 'node:fs/promises';
import path from 'node:path';

const [
  ,
  ,
  inputPath,
  outputDir,
  baseName,
  profileName = '16x9',
  rawPosition = 'centre',
  fitMode = 'cover'
] = process.argv;

if (!inputPath || !outputDir || !baseName) {
  console.error(`
Usage:
  node tools/prepare-image.mjs <input> <output-dir> <base-name> [profile] [position] [fit]

Profiles:
  16x9   widths 640, 960, 1440; JPG fallback 960
  4x3    widths 640, 960, 1440; JPG fallback 960
  4x5    widths 480, 800, 1200; JPG fallback 800

Positions:
  centre
  north
  south
  east
  west
  northeast
  northwest
  southeast
  southwest

Fit modes:
  cover
    Fills the whole output frame.
    The image may be cropped.

  contain
    Keeps the whole image visible.
    Empty space is filled with the BZ3O ivory background.

Examples:

  node tools/prepare-image.mjs \
    input.jpg \
    public/images/article-history \
    article-history \
    16x9 \
    centre \
    cover

  node tools/prepare-image.mjs \
    input.jpg \
    public/images/training-kou-bu \
    training-kou-bu \
    16x9 \
    centre \
    contain

  node tools/prepare-image.mjs \
    portrait.jpg \
    public/images/instructor-renata \
    instructor-renata \
    4x5 \
    north \
    cover
`);
  process.exit(1);
}

const profiles = {
  '16x9': {
    ratio: 16 / 9,
    widths: [640, 960, 1440],
    jpgWidth: 960
  },

  '4x3': {
    ratio: 4 / 3,
    widths: [640, 960, 1440],
    jpgWidth: 960
  },

  '4x5': {
    ratio: 4 / 5,
    widths: [480, 800, 1200],
    jpgWidth: 800
  }
};

const profile = profiles[profileName];

if (!profile) {
  console.error(`Unknown profile: ${profileName}`);
  console.error(
    `Available profiles: ${Object.keys(profiles).join(', ')}`
  );
  process.exit(1);
}

const positionAliases = {
  center: 'centre',
  centre: 'centre',

  top: 'north',
  bottom: 'south',

  left: 'west',
  right: 'east'
};

const position =
  positionAliases[rawPosition] ?? rawPosition;

const validPositions = new Set([
  'centre',
  'north',
  'south',
  'east',
  'west',
  'northeast',
  'northwest',
  'southeast',
  'southwest'
]);

if (!validPositions.has(position)) {
  console.error(`Unknown position: ${rawPosition}`);
  console.error(
    `Available positions: ${[...validPositions].join(', ')}`
  );
  process.exit(1);
}

const validFitModes = new Set([
  'cover',
  'contain'
]);

if (!validFitModes.has(fitMode)) {
  console.error(`Unknown fit mode: ${fitMode}`);
  console.error(
    'Available fit modes: cover, contain'
  );
  process.exit(1);
}

await mkdir(outputDir, {
  recursive: true
});

const metadata = await sharp(inputPath).metadata();

console.log('');
console.log('BZ3O image preparation');
console.log('----------------------');
console.log(`Input:     ${inputPath}`);
console.log(
  `Source:    ${metadata.width ?? '?'} x ${metadata.height ?? '?'} px`
);
console.log(`Profile:   ${profileName}`);
console.log(`Position:  ${position}`);
console.log(`Fit:       ${fitMode}`);
console.log(`Output:    ${outputDir}`);
console.log('');

const maxWidth = Math.max(...profile.widths);

if (
  metadata.width &&
  metadata.width < maxWidth
) {
  console.warn(
    `WARNING: source width (${metadata.width}px) is smaller ` +
    `than the largest requested output (${maxWidth}px).`
  );
  console.warn(
    'The largest generated image will therefore be upscaled.'
  );
  console.warn('');
}

function heightFor(width) {
  return Math.round(
    width / profile.ratio
  );
}

async function render(
  width,
  format
) {
  const height = heightFor(width);

  const outPath = path.join(
    outputDir,
    `${baseName}-${width}.${format}`
  );

  let pipeline = sharp(inputPath)
    .rotate()
    .resize(
      width,
      height,
      {
        fit: fitMode,
        position,

        // BZ3O ivory background.
        // Used mainly by "contain".
        background: '#F9F8F6'
      }
    );

  if (format === 'avif') {
    pipeline = pipeline.avif({
      quality: 58,
      effort: 5
    });
  }

  else if (format === 'webp') {
    pipeline = pipeline.webp({
      quality: 82,
      effort: 5
    });
  }

  else if (format === 'jpg') {
    pipeline = pipeline.jpeg({
      quality: 88,
      progressive: true,
      mozjpeg: true
    });
  }

  else {
    throw new Error(
      `Unsupported format: ${format}`
    );
  }

  await pipeline.toFile(
    outPath
  );

  console.log(
    `Created: ${outPath}`
  );
}

for (
  const width of profile.widths
) {
  await render(
    width,
    'avif'
  );

  await render(
    width,
    'webp'
  );
}

await render(
  profile.jpgWidth,
  'jpg'
);

console.log('');
console.log('Done.');
