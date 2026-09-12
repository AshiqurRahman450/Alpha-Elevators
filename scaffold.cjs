const fs = require('fs');
const path = require('path');

const components = [
  'Navbar', 'LoadingScreen', 'Hero', 'About', 'WhyAlpha', 'Features', 
  'ExplodedView', 'Safety', 'Products', 'Locations', 'Gallery', 'FAQ', 
  'Contact', 'Footer'
];

const dir = path.join(__dirname, 'src', 'components');
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

components.forEach(name => {
  const content = `export const ${name} = () => {
  return (
    <section className="min-h-screen relative z-10 w-full flex items-center justify-center border-b border-white/10" id="${name.toLowerCase()}">
      <div className="container mx-auto px-6">
        <h2 className="text-4xl font-display text-accent mb-4">${name}</h2>
        <p className="text-metal">Placeholder for ${name} section.</p>
      </div>
    </section>
  )
}
`;
  const filePath = path.join(dir, `${name}.tsx`);
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, content);
  }
});

console.log('Components created successfully.');
