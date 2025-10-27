// Figma Plugin: Build Loja Africana Rosa Design System
// Copy this code into Figma Plugin Editor and run

// Design System Data
const designSystem = {
  colors: {
    'Color/Primary': '#B93B8F',
    'Color/Primary-Dark': '#8B2D6B',
    'Color/Secondary': '#D4AF37',
    'Color/Accent': '#FF6B35',
    'Color/Success': '#10B981',
    'Color/Error': '#EF4444',
    'Color/Neutral-50': '#F9FAFB',
    'Color/Neutral-100': '#F3F4F6',
    'Color/Neutral-200': '#E5E7EB',
    'Color/Neutral-500': '#6B7280',
    'Color/Neutral-900': '#111827'
  },
  typography: {
    'Typography/Heading1': { size: 36, weight: 700 },
    'Typography/Heading2': { size: 30, weight: 700 },
    'Typography/Heading3': { size: 24, weight: 600 },
    'Typography/BodyLarge': { size: 16, weight: 400 },
    'Typography/Body': { size: 14, weight: 400 },
    'Typography/Caption': { size: 12, weight: 500 }
  }
};

// Helper function to convert hex to RGB
function hexToRgb(hex) {
  const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
  return result ? {
    r: parseInt(result[1], 16) / 255,
    g: parseInt(result[2], 16) / 255,
    b: parseInt(result[3], 16) / 255
  } : { r: 0, g: 0, b: 0 };
}

// Create Design System Page
function createDesignSystemPage() {
  const page = figma.createPage();
  page.name = 'Design System';
  figma.currentPage = page;

  let yPos = 0;

  // Create Color Palette Section
  const colorTitle = figma.createText();
  colorTitle.characters = 'COLOR PALETTE';
  colorTitle.fontSize = 30;
  colorTitle.fontWeight = 700;
  colorTitle.y = yPos;
  yPos += 60;

  let xPos = 0;
  for (const [colorName, colorHex] of Object.entries(designSystem.colors)) {
    // Create color rectangle
    const colorRect = figma.createRectangle();
    colorRect.resize(100, 100);
    colorRect.x = xPos;
    colorRect.y = yPos;

    const rgb = hexToRgb(colorHex);
    colorRect.fills = [{
      type: 'SOLID',
      color: rgb,
      opacity: 1
    }];

    // Create color label
    const label = figma.createText();
    label.characters = `${colorName}\n${colorHex}`;
    label.fontSize = 10;
    label.x = xPos;
    label.y = yPos + 110;

    // Create color style
    const colorStyle = figma.createPaintStyle();
    colorStyle.name = colorName;
    colorStyle.paints = colorRect.fills;

    xPos += 120;
    if (xPos > 1000) {
      xPos = 0;
      yPos += 200;
    }
  }

  yPos += 250;
  xPos = 0;

  // Create Typography Section
  const typographyTitle = figma.createText();
  typographyTitle.characters = 'TYPOGRAPHY';
  typographyTitle.fontSize = 30;
  typographyTitle.fontWeight = 700;
  typographyTitle.y = yPos;
  yPos += 60;

  for (const [typeName, typeProps] of Object.entries(designSystem.typography)) {
    const textElem = figma.createText();
    textElem.characters = `${typeName} - ${typeProps.size}px / ${typeProps.weight}`;
    textElem.fontSize = typeProps.size;
    textElem.fontWeight = typeProps.weight;
    textElem.x = 0;
    textElem.y = yPos;

    // Create text style
    const textStyle = figma.createTextStyle();
    textStyle.name = typeName;
    textStyle.fontSize = typeProps.size;
    textStyle.fontWeight = typeProps.weight;

    yPos += typeProps.size + 30;
  }

  figma.notify('Design System page created!');
}

// Create Components Page
function createComponentsPage() {
  const page = figma.createPage();
  page.name = 'Components';
  figma.currentPage = page;

  let yPos = 0;

  // Create Button Component
  const buttonFrame = figma.createFrame();
  buttonFrame.name = 'Button/Primary/Medium';
  buttonFrame.resize(100, 40);
  buttonFrame.x = 0;
  buttonFrame.y = yPos;

  // Button background
  const buttonBg = figma.createRectangle();
  buttonBg.resize(100, 40);
  buttonBg.cornerRadius = 8;
  const rgb = hexToRgb('#B93B8F');
  buttonBg.fills = [{
    type: 'SOLID',
    color: rgb,
    opacity: 1
  }];
  buttonFrame.appendChild(buttonBg);

  // Button text
  const buttonText = figma.createText();
  buttonText.characters = 'Button';
  buttonText.fontSize = 14;
  buttonText.fontWeight = 600;
  buttonText.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 1
  }];
  buttonText.x = 10;
  buttonText.y = 10;
  buttonFrame.appendChild(buttonText);

  // Make it a component
  const buttonComponent = buttonFrame.createComponent();
  buttonComponent.name = 'Button/Primary/Medium';

  yPos += 80;

  // Create ProductCard Component
  const cardFrame = figma.createFrame();
  cardFrame.name = 'ProductCard';
  cardFrame.resize(180, 220);
  cardFrame.x = 0;
  cardFrame.y = yPos;
  cardFrame.cornerRadius = 8;

  // Card background
  const cardBg = figma.createRectangle();
  cardBg.resize(180, 220);
  cardBg.cornerRadius = 8;
  cardBg.strokes = [{
    type: 'SOLID',
    color: hexToRgb('#E5E7EB'),
    opacity: 1
  }];
  cardBg.strokeWeight = 1;
  cardBg.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 1
  }];
  cardFrame.appendChild(cardBg);

  // Product image placeholder
  const imgPlaceholder = figma.createRectangle();
  imgPlaceholder.resize(180, 180);
  imgPlaceholder.fills = [{
    type: 'SOLID',
    color: hexToRgb('#F3F4F6'),
    opacity: 1
  }];
  imgPlaceholder.x = 0;
  imgPlaceholder.y = 0;
  cardFrame.appendChild(imgPlaceholder);

  // Product name
  const productName = figma.createText();
  productName.characters = 'Product Name';
  productName.fontSize = 14;
  productName.fontWeight = 600;
  productName.x = 8;
  productName.y = 190;
  cardFrame.appendChild(productName);

  // Make it a component
  const cardComponent = cardFrame.createComponent();
  cardComponent.name = 'ProductCard';

  yPos += 260;

  // Create Input Component
  const inputFrame = figma.createFrame();
  inputFrame.name = 'Input/Text';
  inputFrame.resize(240, 40);
  inputFrame.x = 0;
  inputFrame.y = yPos;
  inputFrame.cornerRadius = 4;

  const inputBg = figma.createRectangle();
  inputBg.resize(240, 40);
  inputBg.cornerRadius = 4;
  inputBg.fills = [{
    type: 'SOLID',
    color: hexToRgb('#F9FAFB'),
    opacity: 1
  }];
  inputBg.strokes = [{
    type: 'SOLID',
    color: hexToRgb('#E5E7EB'),
    opacity: 1
  }];
  inputBg.strokeWeight = 1;
  inputFrame.appendChild(inputBg);

  const inputText = figma.createText();
  inputText.characters = 'Placeholder...';
  inputText.fontSize = 14;
  inputText.x = 12;
  inputText.y = 12;
  inputFrame.appendChild(inputText);

  const inputComponent = inputFrame.createComponent();
  inputComponent.name = 'Input/Text';

  figma.notify('Components page created!');
}

// Create Screens Page
function createScreensPage() {
  const page = figma.createPage();
  page.name = 'Mobile Screens';
  figma.currentPage = page;

  // Home Screen
  const homeFrame = figma.createFrame();
  homeFrame.name = 'Home';
  homeFrame.resize(360, 1200);
  homeFrame.x = 0;
  homeFrame.y = 0;
  homeFrame.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 1
  }];

  // Header
  const header = figma.createRectangle();
  header.resize(360, 50);
  header.fills = [{
    type: 'SOLID',
    color: hexToRgb('#B93B8F'),
    opacity: 1
  }];
  homeFrame.appendChild(header);

  const headerText = figma.createText();
  headerText.characters = 'Loja Africana Rosa';
  headerText.fontSize = 16;
  headerText.fontWeight = 600;
  headerText.fills = [{
    type: 'SOLID',
    color: { r: 1, g: 1, b: 1 },
    opacity: 1
  }];
  headerText.x = 12;
  headerText.y = 15;
  homeFrame.appendChild(headerText);

  // Add placeholder content
  const contentText = figma.createText();
  contentText.characters = 'Home Screen\n\nAdd your components here:\n- Search bar\n- Hero banner\n- Product cards\n- Categories\n- Footer';
  contentText.fontSize = 14;
  contentText.x = 12;
  contentText.y = 70;
  homeFrame.appendChild(contentText);

  figma.notify('Screens page created with Home screen!');
}

// Main execution
async function main() {
  figma.ui.show({ width: 300, height: 400 });

  // Create all pages
  createDesignSystemPage();
  createComponentsPage();
  createScreensPage();

  figma.notify('✅ Design System Built!\n\nPages created:\n✓ Design System\n✓ Components\n✓ Mobile Screens');
}

main();
