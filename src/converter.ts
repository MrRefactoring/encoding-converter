import * as fs from 'fs';
import * as path from 'path';
import * as encoding from 'encoding';

const from = 'cp1251';
const to = 'utf-8';

function convert(inputDirectory: string, outputDirectory: string): void {
  fs.mkdirSync(outputDirectory, { recursive: true });

  fs.readdirSync(inputDirectory)
    .filter((filename) => path.extname(filename) !== '.DS_Store')
    .forEach((filename) => {
      const inputPath = path.join(inputDirectory, filename);
      const outputPath = path.join(outputDirectory, filename);

      if (fs.statSync(inputPath).isDirectory()) {
        return convert(inputPath, outputPath);
      }

      const fileBuffer = fs.readFileSync(inputPath);
      const outputBuffer = encoding.convert(fileBuffer, to, from);

      fs.writeFileSync(outputPath, outputBuffer);
    });
}

const inputDirectory = path.resolve(__dirname, '..', 'input');
const outputDirectory = path.resolve(__dirname, '..', 'output');

convert(inputDirectory, outputDirectory);
