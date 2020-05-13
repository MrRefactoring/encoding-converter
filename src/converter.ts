import * as fs from 'fs';
import * as path from 'path';
import * as encoding from 'encoding';

const from = 'cp1251';
const to = 'utf-8';

const inputDir = path.resolve(__dirname, 'input');
const outputDir = path.resolve(__dirname, 'output');

fs.mkdirSync(outputDir, { recursive: true });

const filesForConverting = fs.readdirSync(inputDir);

filesForConverting.forEach((filename) => {
  const fullInputFilePath = path.join(inputDir, filename);
  const fullOutputFilePath = path.join(outputDir, filename);

  const fileBuffer = fs.readFileSync(fullInputFilePath);
  const outputBuffer = encoding.convert(fileBuffer, to, from);

  fs.writeFileSync(outputBuffer, fullOutputFilePath);
});
