const fs = require('fs');
const path = require('path');

const svgPath = 'c:/Users/Ovindu/Documents/Ardeno Studio/Demos/Demo Websites/Urban Kitchen [Restaurant]/public/logo.svg';
const targetPath = 'c:/Users/Ovindu/Documents/Ardeno Studio/Demos/Demo Websites/Urban Kitchen [Restaurant]/src/components/DemoLoader.tsx';

const svgContent = fs.readFileSync(svgPath, 'utf8');

// The groups are identified by their translations
const matchR = svgContent.match(/<g transform="translate\(263\.331536,\s*475\.268009\)"><g><path d="([^"]+)"/);
const matchB = svgContent.match(/<g transform="translate\(360\.967187,\s*451\.907518\)"><g><path d="([^"]+)"/);
const matchA = svgContent.match(/<g transform="translate\(485\.144608,\s*422\.196593\)"><g><path d="([^"]+)"/);

if (!matchR || !matchB || !matchA) {
  console.log("Could not find paths!");
  process.exit(1);
}

const rPath = matchR[1];
const bPath = matchB[1];
const aPath = matchA[1];

let tsxContent = fs.readFileSync(targetPath, 'utf8');

// Replace the R_PATH
tsxContent = tsxContent.replace(
  /const R_PATH =[\s\S]*?(?=const B_PATH =)/,
  `const R_PATH =\n    "${rPath}";\n\n`
);

// Replace the B_PATH
tsxContent = tsxContent.replace(
  /const B_PATH =[\s\S]*?(?=const A_PATH =)/,
  `const B_PATH =\n    "${bPath}";\n\n`
);

// Replace the A_PATH
tsxContent = tsxContent.replace(
  /const A_PATH =[\s\S]*?(?=const N_PATH =)/,
  `const A_PATH =\n    "${aPath}";\n\n`
);

fs.writeFileSync(targetPath, tsxContent);
console.log("Successfully patched DemoLoader.tsx with correct paths!");
