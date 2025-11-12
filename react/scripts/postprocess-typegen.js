#!/usr/bin/env node

/**
 * Post-processes pocketbase-typegen output to convert enums to const objects
 * for compatibility with erasableSyntaxOnly TypeScript setting.
 */

import { readFileSync, writeFileSync } from 'fs';
import { fileURLToPath } from 'url';
import { dirname, resolve } from 'path';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const typegenFile = resolve(__dirname, '../src/types/pocketbase.gen.ts');

try {
  let content = readFileSync(typegenFile, 'utf-8');

  // Convert enum to const object with 'as const'
  // Matches: export enum Collections { ... }
  const enumRegex = /export enum Collections \{([^}]+)\}/s;
  const match = content.match(enumRegex);

  if (match) {
    const enumBody = match[1];
    // Extract key-value pairs from enum
    const entries = enumBody
      .split(',')
      .map(line => line.trim())
      .filter(line => line.length > 0)
      .map(line => {
        // Handle both "Key = value" and "Key = 'value'" formats
        const [key, ...valueParts] = line.split('=').map(s => s.trim());
        const value = valueParts.join('=').trim();
        return `  ${key}: ${value}`;
      })
      .join(',\n');

    const constObject = `export const Collections = {\n${entries},\n} as const;

export type Collections = typeof Collections[keyof typeof Collections];`;

    content = content.replace(enumRegex, constObject);
    writeFileSync(typegenFile, content, 'utf-8');
    console.log('✓ Converted enum to const object in pocketbase.gen.ts');
  } else {
    console.warn('⚠ No Collections enum found in generated file');
  }
} catch (error) {
  console.error('Error post-processing typegen file:', error);
  process.exit(1);
}
