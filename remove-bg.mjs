import { removeBackground } from '@imgly/background-removal-node';
import { readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const photos = [
  { input: 'assets/photo-ut.jpg',    output: 'assets/photo-ut-cutout.png'    },
  { input: 'assets/photo-beach.jpg', output: 'assets/photo-beach-cutout.png' },
  { input: 'assets/photo-run.jpg',   output: 'assets/photo-run-cutout.png'   },
];

for (const { input, output } of photos) {
  console.log(`Processing ${input}...`);
  try {
    const imageData = readFileSync(input);
    const blob = new Blob([imageData], { type: 'image/jpeg' });
    const resultBlob = await removeBackground(blob, {
      model: 'medium',
      output: { format: 'image/png', quality: 1 },
    });
    const buffer = Buffer.from(await resultBlob.arrayBuffer());
    writeFileSync(output, buffer);
    console.log(`  ✓ Saved ${output}`);
  } catch (err) {
    console.error(`  ✗ Failed ${input}:`, err.message);
  }
}
console.log('Done!');
