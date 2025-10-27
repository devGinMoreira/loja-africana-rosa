#!/usr/bin/env node

/**
 * Extract Design Tokens from Figma Design System JSON
 * Generates Tailwind configuration and CSS variables
 */

const fs = require('fs');
const path = require('path');

console.log('\n📦 Extracting Design Tokens\n');

// Read design system JSON
const designSystemPath = path.join(__dirname, 'docs/design/figma-design-system.json');
const designSystem = JSON.parse(fs.readFileSync(designSystemPath, 'utf8'));

// Generate Tailwind configuration
const tailwindConfig = {
  theme: {
    extend: {
      colors: {},
      spacing: {},
      fontSize: {},
      fontWeight: {},
      borderRadius: {},
      boxShadow: {}
    }
  }
};

// Map colors
console.log('✓ Processing Colors...');
designSystem.colorTokens.forEach(color => {
  const colorKey = color.name
    .toLowerCase()
    .replace(/\s+/g, '-');
  tailwindConfig.theme.extend.colors[colorKey] = color.hex;
});

// Map spacing
console.log('✓ Processing Spacing...');
Object.entries(designSystem.spacing).forEach(([key, value]) => {
  const spacingValue = parseInt(value) / 16; // Convert px to rem
  tailwindConfig.theme.extend.spacing[key] = spacingValue + 'rem';
});

// Map typography
console.log('✓ Processing Typography...');
tailwindConfig.theme.extend.fontSize = {};
designSystem.typography.forEach(type => {
  const typeKey = type.name
    .toLowerCase()
    .replace(/\s+/g, '-');
  tailwindConfig.theme.extend.fontSize[typeKey] = [
    type.fontSize + 'px',
    {
      lineHeight: type.lineHeight + 'px',
      fontWeight: type.fontWeight
    }
  ];
});

// Map border radius
console.log('✓ Processing Border Radius...');
Object.entries(designSystem.borderRadius).forEach(([key, value]) => {
  tailwindConfig.theme.extend.borderRadius[key] = value;
});

// Map shadows
console.log('✓ Processing Shadows...');
designSystem.shadows.forEach(shadow => {
  const shadowKey = shadow.name.toLowerCase();
  const shadowValue = `${shadow.x}px ${shadow.y}px ${shadow.blur}px ${shadow.spread}px ${shadow.color}`;
  tailwindConfig.theme.extend.boxShadow[shadowKey] = shadowValue;
});

// Generate CSS variables
console.log('✓ Generating CSS Variables...');
let cssVariables = ':root {\n';

designSystem.colorTokens.forEach(color => {
  const varName = '--color-' + color.name
    .toLowerCase()
    .replace(/\s+/g, '-');
  cssVariables += `  ${varName}: ${color.hex};\n`;
});

Object.entries(designSystem.spacing).forEach(([key, value]) => {
  cssVariables += `  --spacing-${key}: ${value};\n`;
});

cssVariables += '}\n';

// Write Tailwind configuration
console.log('\n📝 Writing Configuration Files...');

const tailwindConfigPath = path.join(__dirname, 'tailwind.config.js');
const tailwindContent = `module.exports = ${JSON.stringify(tailwindConfig, null, 2)};`;
fs.writeFileSync(tailwindConfigPath, tailwindContent);
console.log('  ✓ tailwind.config.js');

// Write CSS variables file
const cssVarsPath = path.join(__dirname, 'apps/web-shop/src/styles/design-tokens.css');
const cssVarsDir = path.dirname(cssVarsPath);
if (!fs.existsSync(cssVarsDir)) {
  fs.mkdirSync(cssVarsDir, { recursive: true });
}
fs.writeFileSync(cssVarsPath, cssVariables);
console.log('  ✓ design-tokens.css');

// Generate design tokens TypeScript file
console.log('  ✓ Generating TypeScript design tokens...');
const tsTokens = {
  colors: {},
  spacing: {},
  typography: {},
  shadows: {},
  borderRadius: {}
};

designSystem.colorTokens.forEach(color => {
  const colorKey = color.name
    .toLowerCase()
    .replace(/\s+/g, '_');
  tsTokens.colors[colorKey] = {
    hex: color.hex,
    rgb: color.rgb,
    usage: color.usage
  };
});

Object.entries(designSystem.spacing).forEach(([key, value]) => {
  tsTokens.spacing[key] = value;
});

designSystem.typography.forEach(type => {
  const typeKey = type.name
    .toLowerCase()
    .replace(/\s+/g, '_');
  tsTokens.typography[typeKey] = {
    fontSize: type.fontSize,
    fontWeight: type.fontWeight,
    lineHeight: type.lineHeight,
    letterSpacing: type.letterSpacing,
    usage: type.usage
  };
});

designSystem.shadows.forEach(shadow => {
  const shadowKey = shadow.name.toLowerCase();
  tsTokens.shadows[shadowKey] = {
    x: shadow.x,
    y: shadow.y,
    blur: shadow.blur,
    spread: shadow.spread,
    color: shadow.color
  };
});

Object.entries(designSystem.borderRadius).forEach(([key, value]) => {
  tsTokens.borderRadius[key] = value;
});

const tsTokensPath = path.join(__dirname, 'apps/web-shop/src/styles/design-tokens.ts');
const tsTokensDir = path.dirname(tsTokensPath);
if (!fs.existsSync(tsTokensDir)) {
  fs.mkdirSync(tsTokensDir, { recursive: true });
}
const tsTokensContent = `/**
 * Design Tokens (Auto-generated from Figma Design System)
 * DO NOT EDIT MANUALLY - Update in docs/design/figma-design-system.json
 */

export const designTokens = ${JSON.stringify(tsTokens, null, 2)};

export const colors = designTokens.colors;
export const spacing = designTokens.spacing;
export const typography = designTokens.typography;
export const shadows = designTokens.shadows;
export const borderRadius = designTokens.borderRadius;
`;
fs.writeFileSync(tsTokensPath, tsTokensContent);
console.log('  ✓ design-tokens.ts');

// Generate summary
console.log('\n' + '='.repeat(60));
console.log('✓ Design Tokens Extracted Successfully!\n');
console.log('Generated files:');
console.log('  • tailwind.config.js');
console.log('  • apps/web-shop/src/styles/design-tokens.css');
console.log('  • apps/web-shop/src/styles/design-tokens.ts\n');
console.log('Summary:');
console.log('  • Colors: ' + designSystem.colorTokens.length);
console.log('  • Spacing scales: ' + Object.keys(designSystem.spacing).length);
console.log('  • Typography styles: ' + designSystem.typography.length);
console.log('  • Shadows: ' + designSystem.shadows.length);
console.log('  • Border radius scales: ' + Object.keys(designSystem.borderRadius).length + '\n');
