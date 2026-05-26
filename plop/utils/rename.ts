import { existsSync, readFileSync, renameSync, writeFileSync } from 'fs';

import { walkTs } from './file-edit';

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

function kebabToPascal(s: string): string {
  return s
    .split('-')
    .filter(Boolean)
    .map((p) => p[0].toUpperCase() + p.slice(1))
    .join('');
}

function kebabToCamel(s: string): string {
  const p = kebabToPascal(s);
  return p ? p[0].toLowerCase() + p.slice(1) : '';
}

type Rewriter = (content: string) => string;

function rewriteImportPaths(
  oldSegment: string,
  newSegment: string,
  matchFileBase = false,
): Rewriter {
  return (content) => {
    return content.replace(
      /(from\s*|import\s*\(\s*|require\s*\(\s*)(['"])([^'"]+)\2/g,
      (full, prefix, quote, path) => {
        let next = path;
        if (matchFileBase) {
          next = next.replace(
            new RegExp(`/${escapeRe(oldSegment)}(?=[/.'"]|$)`, 'g'),
            `/${newSegment}`,
          );
        } else {
          next = next.replace(
            new RegExp(`(^|/)${escapeRe(oldSegment)}(?=[/.'"]|$)`, 'g'),
            `$1${newSegment}`,
          );
        }
        return `${prefix}${quote}${next}${quote}`;
      },
    );
  };
}

function rewriteWholeWord(oldSym: string, newSym: string): Rewriter {
  return (content) =>
    content.replace(new RegExp(`\\b${escapeRe(oldSym)}\\b`, 'g'), newSym);
}

function applyRewriters(filePath: string, rewriters: Rewriter[]): boolean {
  if (!existsSync(filePath)) return false;
  const content = readFileSync(filePath, 'utf8');
  let next = content;
  for (const r of rewriters) next = r(next);
  if (next === content) return false;
  writeFileSync(filePath, next, 'utf8');
  return true;
}

function fileContainsAny(filePath: string, symbols: string[]): boolean {
  if (!existsSync(filePath)) return false;
  const content = readFileSync(filePath, 'utf8');
  return symbols.some((s) =>
    new RegExp(`\\b${escapeRe(s)}\\b`).test(content),
  );
}

export type RenameKind = 'module' | 'controller' | 'service' | 'provider';

export type RenamePlan = {
  oldClass: string;
  newClass: string;
  oldProp?: string;
  newProp?: string;
  pathRenames: { from: string; to: string }[];
  rewriters: Rewriter[];
  /** Symbols that mark a file as a consumer worth touching. */
  symbolsToScan: string[];
  /** Path segment renames applied in `from`/`import()`/`require()` strings. */
  pathSegmentRenames: {
    oldSegment: string;
    newSegment: string;
    matchFileBase: boolean;
  }[];
};

function planService(
  moduleName: string,
  oldName: string,
  newName: string,
  renameProperty: boolean,
): RenamePlan {
  const oldClass = kebabToPascal(oldName) + 'Service';
  const newClass = kebabToPascal(newName) + 'Service';
  const oldProp = kebabToCamel(oldName) + 'Service';
  const newProp = kebabToCamel(newName) + 'Service';
  const dir = `src/modules/${moduleName}/services`;
  const rewriters: Rewriter[] = [rewriteWholeWord(oldClass, newClass)];
  if (renameProperty) rewriters.push(rewriteWholeWord(oldProp, newProp));
  rewriters.push(
    rewriteImportPaths(`${oldName}.service`, `${newName}.service`, true),
  );
  return {
    oldClass,
    newClass,
    oldProp: renameProperty ? oldProp : undefined,
    newProp: renameProperty ? newProp : undefined,
    pathRenames: [
      { from: `${dir}/${oldName}.service.ts`, to: `${dir}/${newName}.service.ts` },
      {
        from: `${dir}/${oldName}.service.spec.ts`,
        to: `${dir}/${newName}.service.spec.ts`,
      },
    ],
    rewriters,
    symbolsToScan: [oldClass],
    pathSegmentRenames: [
      {
        oldSegment: `${oldName}.service`,
        newSegment: `${newName}.service`,
        matchFileBase: true,
      },
    ],
  };
}

function planProvider(
  moduleName: string,
  oldName: string,
  newName: string,
  renameProperty: boolean,
): RenamePlan {
  const oldClass = kebabToPascal(oldName);
  const newClass = kebabToPascal(newName);
  const oldProp = kebabToCamel(oldName);
  const newProp = kebabToCamel(newName);
  const dir = `src/modules/${moduleName}/providers`;
  const rewriters: Rewriter[] = [rewriteWholeWord(oldClass, newClass)];
  if (renameProperty) rewriters.push(rewriteWholeWord(oldProp, newProp));
  rewriters.push(rewriteImportPaths(oldName, newName, true));
  return {
    oldClass,
    newClass,
    oldProp: renameProperty ? oldProp : undefined,
    newProp: renameProperty ? newProp : undefined,
    pathRenames: [
      { from: `${dir}/${oldName}.ts`, to: `${dir}/${newName}.ts` },
      { from: `${dir}/${oldName}.spec.ts`, to: `${dir}/${newName}.spec.ts` },
    ],
    rewriters,
    symbolsToScan: [oldClass],
    pathSegmentRenames: [
      { oldSegment: oldName, newSegment: newName, matchFileBase: true },
    ],
  };
}

function planController(
  moduleName: string,
  oldName: string,
  newName: string,
): RenamePlan {
  const oldClass = kebabToPascal(oldName) + 'Controller';
  const newClass = kebabToPascal(newName) + 'Controller';
  const dir = `src/modules/${moduleName}/controllers`;
  const rewriters: Rewriter[] = [
    rewriteWholeWord(oldClass, newClass),
    rewriteImportPaths(
      `${oldName}.controller`,
      `${newName}.controller`,
      true,
    ),
  ];
  return {
    oldClass,
    newClass,
    pathRenames: [
      {
        from: `${dir}/${oldName}.controller.ts`,
        to: `${dir}/${newName}.controller.ts`,
      },
      {
        from: `${dir}/${oldName}.controller.spec.ts`,
        to: `${dir}/${newName}.controller.spec.ts`,
      },
    ],
    rewriters,
    symbolsToScan: [oldClass],
    pathSegmentRenames: [
      {
        oldSegment: `${oldName}.controller`,
        newSegment: `${newName}.controller`,
        matchFileBase: true,
      },
    ],
  };
}

function planModule(oldName: string, newName: string): RenamePlan {
  const oldClass = kebabToPascal(oldName) + 'Module';
  const newClass = kebabToPascal(newName) + 'Module';
  const oldDir = `src/modules/${oldName}`;
  const newDir = `src/modules/${newName}`;
  const rewriters: Rewriter[] = [
    rewriteWholeWord(oldClass, newClass),
    rewriteImportPaths(`${oldName}.module`, `${newName}.module`, false),
    rewriteImportPaths(oldName, newName, false),
  ];
  return {
    oldClass,
    newClass,
    pathRenames: [
      {
        from: `${oldDir}/${oldName}.module.ts`,
        to: `${oldDir}/${newName}.module.ts`,
      },
      { from: oldDir, to: newDir },
    ],
    rewriters,
    symbolsToScan: [oldClass],
    pathSegmentRenames: [
      { oldSegment: oldName, newSegment: newName, matchFileBase: false },
      {
        oldSegment: `${oldName}.module`,
        newSegment: `${newName}.module`,
        matchFileBase: false,
      },
    ],
  };
}

function plan(
  kind: RenameKind,
  moduleName: string,
  oldName: string,
  newName: string,
  renameProperty: boolean,
): RenamePlan {
  switch (kind) {
    case 'service':
      return planService(moduleName, oldName, newName, renameProperty);
    case 'provider':
      return planProvider(moduleName, oldName, newName, renameProperty);
    case 'controller':
      return planController(moduleName, oldName, newName);
    case 'module':
      return planModule(oldName, newName);
  }
}

function scanAffectedFiles(p: RenamePlan): string[] {
  return walkTs('src').filter((f) => {
    if (fileContainsAny(f, p.symbolsToScan)) return true;
    if (!existsSync(f)) return false;
    const content = readFileSync(f, 'utf8');
    return p.pathSegmentRenames.some((seg) => {
      const re = new RegExp(
        `(from\\s*|import\\s*\\(\\s*|require\\s*\\(\\s*)(['"])[^'"]*?${
          seg.matchFileBase ? '/' : '(?:^|/)'
        }${escapeRe(seg.oldSegment)}(?=[/.'"]|$)`,
      );
      return re.test(content);
    });
  });
}

export type ScanResult = {
  oldClass: string;
  newClass: string;
  affectedFiles: string[];
  pathRenames: { from: string; to: string }[];
};

export function scanRename(
  kind: RenameKind,
  moduleName: string,
  oldName: string,
  newName: string,
  renameProperty: boolean,
): ScanResult {
  const p = plan(kind, moduleName, oldName, newName, renameProperty);
  return {
    oldClass: p.oldClass,
    newClass: p.newClass,
    affectedFiles: scanAffectedFiles(p),
    pathRenames: p.pathRenames.filter((r) => existsSync(r.from)),
  };
}

export type RenameResult = {
  oldClass: string;
  newClass: string;
  rewrittenFiles: string[];
  movedPaths: { from: string; to: string }[];
};

export function applyRename(
  kind: RenameKind,
  moduleName: string,
  oldName: string,
  newName: string,
  renameProperty: boolean,
): RenameResult {
  if (oldName === newName) {
    throw new Error('rename: oldName equals newName');
  }
  const p = plan(kind, moduleName, oldName, newName, renameProperty);

  const targets = scanAffectedFiles(p);
  const rewrittenFiles: string[] = [];
  for (const f of targets) {
    if (applyRewriters(f, p.rewriters)) rewrittenFiles.push(f);
  }

  const movedPaths: { from: string; to: string }[] = [];
  for (const r of p.pathRenames) {
    if (existsSync(r.from)) {
      renameSync(r.from, r.to);
      movedPaths.push(r);
    }
  }

  return {
    oldClass: p.oldClass,
    newClass: p.newClass,
    rewrittenFiles,
    movedPaths,
  };
}
