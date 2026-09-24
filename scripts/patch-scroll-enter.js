const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..', 'src', 'Screens');

function relImport(file, component) {
  const depth = path.relative(path.join(__dirname, '..', 'src', 'Screens'), path.dirname(file))
    .split(path.sep)
    .filter(Boolean).length;
  return '../'.repeat(depth + 1) + 'Component/' + component;
}

function patchImports(s, file, removeName, addName) {
  const re = /import\s*\{([^}]*)\}\s*from\s*['"]react-native['"];?/m;
  if (!re.test(s) || !s.includes(removeName)) {
    return s;
  }
  const rel = relImport(file, addName + '.js'.replace('.js.js', '.js'));
  const addPath = relImport(file, addName);
  let out = s.replace(re, (m, inner) => {
    const parts = inner
      .split(',')
      .map(x => x.trim())
      .filter(x => x && x !== removeName);
    const rn = parts.length ? `import {${parts.join(', ')}} from 'react-native';\n` : '';
    return `${rn}import ${addName} from '${addPath}';`;
  });
  return out;
}

function walk(dir) {
  for (const ent of fs.readdirSync(dir, {withFileTypes: true})) {
    const p = path.join(dir, ent.name);
    if (ent.isDirectory()) {
      walk(p);
    } else if (ent.name.endsWith('.js')) {
      processFile(p);
    }
  }
}

function processFile(file) {
  let s = fs.readFileSync(file, 'utf8');
  const orig = s;
  if (s.includes('ScrollEnterFlatList') && s.includes('ScrollEnterScrollView')) {
    return;
  }
  if (/\bFlatList\b/.test(s) && !s.includes('ScrollEnterFlatList')) {
    s = patchImports(s, file, 'FlatList', 'ScrollEnterFlatList');
    s = s.replace(/\bFlatList\b/g, 'ScrollEnterFlatList');
  }
  if (/\bScrollView\b/.test(s) && !s.includes('ScrollEnterScrollView')) {
    s = patchImports(s, file, 'ScrollView', 'ScrollEnterScrollView');
    s = s.replace(/\bScrollEnterScrollViewScrollView\b/g, 'ScrollEnterScrollView');
    s = s.replace(/(?<!ScrollEnter)\bScrollView\b/g, 'ScrollEnterScrollView');
  }
  if (s !== orig) {
    fs.writeFileSync(file, s);
    console.log('updated', path.relative(process.cwd(), file));
  }
}

walk(root);
