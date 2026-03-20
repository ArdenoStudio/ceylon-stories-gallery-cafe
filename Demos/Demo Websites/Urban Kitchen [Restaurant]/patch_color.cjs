const fs = require('fs');

const path = 'c:/Users/Ovindu/Documents/Ardeno Studio/Demos/Demo Websites/Urban Kitchen [Restaurant]/src/components/DemoLoader.tsx';

let content = fs.readFileSync(path, 'utf8');

content = content.replace(/#ff1420/g, '#F3E5AB');
content = content.replace(/#E50914/g, '#D4AF37');
content = content.replace(/#cc0812/g, '#AA8C2C');
content = content.replace(/#ff4d55/g, '#F9F1D8');
content = content.replace(/229,9,20/g, '212,175,55');

fs.writeFileSync(path, content);
console.log('Successfully replaced red colors with gold in DemoLoader.tsx');
