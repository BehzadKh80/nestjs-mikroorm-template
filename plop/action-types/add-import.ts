import type { NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, relative } from 'path';

function toRelativePath(fromFile: string, toFile: string): string {
  const fromDir = dirname(fromFile);
  const relativePath = relative(fromDir, toFile);
  return relativePath.startsWith('.') ? relativePath : './' + relativePath;
}

export default function addImportAction(plop: NodePlopAPI) {
  plop.setActionType('addImport', (answers, config, plop) => {
    const data: any = config?.data;

    const relativePath = plop.renderString(data.path, answers);
    const filePath = resolve(relativePath);
    const importName = plop.renderString(
      typeof data.importName === 'string'
        ? data.importName
        : data.importName(answers),
      answers,
    );
    const fromRendered: string = plop.renderString(
      typeof data.from === 'string' ? data.from : data.from(answers),
      answers,
    );
    let fromPkg = fromRendered.startsWith('src')
      ? toRelativePath(relativePath, fromRendered)
      : fromRendered;
    if (fromPkg.endsWith('.ts'))
      fromPkg = fromPkg.slice(0, fromPkg.lastIndexOf('.'));
    if (!fromPkg) throw new Error('addImport: `from` is required');
    if (!importName) throw new Error('addImport: `importName` is required');
    if (!existsSync(filePath))
      throw new Error(`addImport: file not found — ${filePath}`);

    const escapedPkg = fromPkg.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const importRegex = new RegExp(
      `^import\\s*\\{([^}]*)\\}\\s*from\\s*['"]${escapedPkg}['"]`,
      'm',
    );

    let content = readFileSync(filePath, 'utf8');
    const match = content.match(importRegex);

    if (match) {
      const existing = match[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);

      if (existing.includes(importName)) {
        return `${importName} already imported from '${fromPkg}' — skipped`;
      }

      existing.push(importName);
      existing.sort();

      content = content.replace(
        importRegex,
        `import { ${existing.join(', ')} } from '${fromPkg}'`,
      );
    } else {
      content = `import { ${importName} } from '${fromPkg}';\n` + content;
    }

    writeFileSync(filePath, content, 'utf8');
    return `Added '${importName}' to import from '${fromPkg}' in ${relativePath}`;
  });
}
