import type { NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default function removeImportAction(plop: NodePlopAPI) {
  plop.setActionType('removeImport', (answers, config, plop) => {
    const data: any = config?.data;

    const renderedPath = plop.renderString(data.path, answers);
    const filePath = resolve(renderedPath);
    const importName = plop.renderString(
      typeof data.importName === 'string'
        ? data.importName
        : data.importName(answers),
      answers,
    );

    if (!importName) throw new Error('removeImport: `importName` is required');
    if (!existsSync(filePath))
      throw new Error(`removeImport: file not found — ${filePath}`);

    const content = readFileSync(filePath, 'utf8');
    const escapedName = importName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');

    const importLineRegex = new RegExp(
      `^import\\s*(?:type\\s*)?\\{([^}]*)\\}\\s*from\\s*['"][^'"]+['"];?\\s*\\n?`,
      'gm',
    );

    let importLine: RegExpExecArray | null = null;
    let match: RegExpExecArray | null;
    while ((match = importLineRegex.exec(content)) !== null) {
      const names = match[1]
        .split(',')
        .map((s) => s.trim())
        .filter(Boolean);
      if (names.includes(importName)) {
        importLine = match;
        break;
      }
    }

    if (!importLine) {
      return `${importName} not imported in ${renderedPath} — skipped`;
    }

    const withoutImport =
      content.slice(0, importLine.index) +
      content.slice(importLine.index + importLine[0].length);

    const usageRegex = new RegExp(`\\b${escapedName}\\b`);
    if (usageRegex.test(withoutImport)) {
      return `${importName} still used in ${renderedPath} — skipped`;
    }

    const names = importLine[1]
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean);
    const remaining = names.filter((n) => n !== importName);

    let next: string;
    if (remaining.length === 0) {
      next = withoutImport;
    } else {
      const fromMatch = importLine[0].match(/from\s*(['"][^'"]+['"];?)/);
      const fromPart = fromMatch ? fromMatch[1] : `'';`;
      const typePrefix = /^import\s+type\s/.test(importLine[0]) ? 'type ' : '';
      const replacement = `import ${typePrefix}{ ${remaining.join(', ')} } from ${fromPart}\n`;
      next =
        content.slice(0, importLine.index) +
        replacement +
        content.slice(importLine.index + importLine[0].length);
    }

    writeFileSync(filePath, next, 'utf8');
    return `Removed '${importName}' import from ${renderedPath}`;
  });
}
