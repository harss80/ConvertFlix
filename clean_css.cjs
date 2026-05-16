const fs = require('fs');
const path = require('path');

function walk(dir, callback) {
  fs.readdirSync(dir).forEach(f => {
    let dirPath = path.join(dir, f);
    let isDirectory = fs.statSync(dirPath).isDirectory();
    isDirectory ? walk(dirPath, callback) : callback(path.join(dir, f));
  });
}

const dirToScan = path.join(__dirname, 'src');

walk(dirToScan, function(filePath) {
  if (filePath.endsWith('.css') || filePath.endsWith('.tsx') || filePath.endsWith('.ts')) {
    let content = fs.readFileSync(filePath, 'utf8');
    let original = content;

    if (filePath.endsWith('.css')) {
      // Replace complex backgrounds with simple ones
      content = content.replace(/background:\s*(linear-gradient|radial-gradient)\([^;]*;/g, 'background: var(--bg-secondary);');
      // For standard variables like var(--gradient-primary) or linear-gradient(...) that don't match above exactly
      content = content.replace(/linear-gradient\([^)]+\)/g, 'var(--text-primary)');
      content = content.replace(/radial-gradient\([^)]+\)/g, 'transparent');
      // Replace glows
      content = content.replace(/box-shadow:[^;]*(rgba\([^)]+\)|var\(--shadow-neon-[^)]+\))[^;]*;/g, 'box-shadow: var(--shadow-sm);');
      content = content.replace(/\.glow\s*\{[^}]+\}/g, '.glow { display: none; }');
      content = content.replace(/animation:\s*gradientShift[^;]*;/g, '');
      content = content.replace(/animation:\s*pulseGlow[^;]*;/g, '');
    }

    if (filePath.endsWith('.tsx')) {
      // Remove inline gradients and text-gradient-rainbow
      content = content.replace(/className=\{[^}]*text-gradient-rainbow[^}]*\}/g, match => match.replace('text-gradient-rainbow', ''));
      content = content.replace(/className="[^"]*text-gradient-rainbow[^"]*"/g, match => match.replace('text-gradient-rainbow', ''));
    }

    if (content !== original) {
      fs.writeFileSync(filePath, content, 'utf8');
      console.log('Updated', filePath);
    }
  }
});
