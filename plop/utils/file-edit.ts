import { existsSync, readdirSync, readFileSync, writeFileSync } from 'fs';
import { join } from 'path';

export function walkTs(dir: string): string[] {
  if (!existsSync(dir)) return [];
  const out: string[] = [];
  for (const entry of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, entry.name);
    if (entry.isDirectory()) {
      out.push(...walkTs(p));
    } else if (entry.isFile() && entry.name.endsWith('.ts')) {
      out.push(p);
    }
  }
  return out;
}

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export function fileImportsSymbol(filePath: string, symbol: string): boolean {
  if (!existsSync(filePath)) return false;
  const content = readFileSync(filePath, 'utf8');
  const esc = escapeRe(symbol);
  const re = new RegExp(
    `^import\\s*(?:type\\s*)?\\{[^}]*\\b${esc}\\b[^}]*\\}\\s*from\\s*['"][^'"]+['"]`,
    'm',
  );
  return re.test(content);
}

export type RemoveImportResult =
  | 'removed'
  | 'kept-still-used'
  | 'not-imported'
  | 'file-missing';

export function removeUnusedImportFromFile(
  filePath: string,
  importName: string,
): RemoveImportResult {
  if (!existsSync(filePath)) return 'file-missing';

  const content = readFileSync(filePath, 'utf8');
  const escapedName = escapeRe(importName);

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

  if (!importLine) return 'not-imported';

  const withoutImport =
    content.slice(0, importLine.index) +
    content.slice(importLine.index + importLine[0].length);

  const usageRegex = new RegExp(`\\b${escapedName}\\b`);
  if (usageRegex.test(withoutImport)) return 'kept-still-used';

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
  return 'removed';
}

export function removeTaggedBlockByName(
  filePath: string,
  tag: string,
  name: string,
): boolean {
  if (!existsSync(filePath)) return false;
  const escTag = escapeRe(tag);
  const escName = escapeRe(name);
  const pattern = new RegExp(
    `[ \\t]*\\/\\/ <${escTag} name="${escName}">[\\s\\S]*?[ \\t]*\\/\\/ <\\/${escTag}>\\n?`,
  );
  const content = readFileSync(filePath, 'utf8');
  if (!pattern.test(content)) return false;
  writeFileSync(filePath, content.replace(pattern, ''), 'utf8');
  return true;
}

export type BlockCleanupResult = {
  removed: boolean;
  cleanedImports: string[];
};

function isSymbolUsedOutsideImports(content: string, sym: string): boolean {
  let stripped = content.replace(
    /[ \t]*\/\/ <import name="[^"]+">[\s\S]*?[ \t]*\/\/ <\/import>\n?/g,
    '',
  );
  stripped = stripped.replace(
    /^import\s*(?:type\s*)?\{[^}]*\}\s*from\s*['"][^'"]+['"];?\s*\n?/gm,
    '',
  );
  return new RegExp(`\\b${escapeRe(sym)}\\b`).test(stripped);
}

export function removeBlockAndCleanupImports(
  filePath: string,
  tag: string,
  name: string,
): BlockCleanupResult {
  if (!existsSync(filePath)) return { removed: false, cleanedImports: [] };

  const escTag = escapeRe(tag);
  const escName = escapeRe(name);
  const blockRe = new RegExp(
    `[ \\t]*\\/\\/ <${escTag} name="${escName}">([\\s\\S]*?)[ \\t]*\\/\\/ <\\/${escTag}>\\n?`,
  );

  const content = readFileSync(filePath, 'utf8');
  const match = content.match(blockRe);
  if (!match) return { removed: false, cleanedImports: [] };

  const blockBody = match[1] ?? '';
  writeFileSync(filePath, content.replace(blockRe, ''), 'utf8');

  const ident = /\b([A-Z][A-Za-z0-9_]*)\b/g;
  const candidates = new Set<string>();
  let m: RegExpExecArray | null;
  while ((m = ident.exec(blockBody)) !== null) {
    candidates.add(m[1]);
  }

  const cleanedImports: string[] = [];
  for (const sym of candidates) {
    const current = readFileSync(filePath, 'utf8');
    if (isSymbolUsedOutsideImports(current, sym)) continue;

    if (removeTaggedBlockByName(filePath, 'import', sym)) {
      cleanedImports.push(sym);
      continue;
    }

    if (removeUnusedImportFromFile(filePath, sym) === 'removed') {
      cleanedImports.push(sym);
    }
  }

  return { removed: true, cleanedImports };
}

export function removeTaggedBlocksMatching(
  filePath: string,
  tag: string,
  bodyContains: string,
): number {
  if (!existsSync(filePath)) return 0;
  const escTag = escapeRe(tag);
  const escBody = escapeRe(bodyContains);
  const bodyRe = new RegExp(`\\b${escBody}\\b`);
  const pattern = new RegExp(
    `[ \\t]*\\/\\/ <${escTag} name="[^"]+">[\\s\\S]*?[ \\t]*\\/\\/ <\\/${escTag}>\\n?`,
    'g',
  );
  let removed = 0;
  const content = readFileSync(filePath, 'utf8');
  const next = content.replace(pattern, (block) => {
    if (bodyRe.test(block)) {
      removed++;
      return '';
    }
    return block;
  });
  if (removed > 0) writeFileSync(filePath, next, 'utf8');
  return removed;
}
