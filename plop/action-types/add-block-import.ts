import type { NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve, dirname, relative } from 'path';

function toRelativePath(fromFile: string, toFile: string): string {
  const fromDir = dirname(fromFile);
  const relativePath = relative(fromDir, toFile);
  return relativePath.startsWith('.') ? relativePath : './' + relativePath;
}

export default function addBlockImportAction(plop: NodePlopAPI) {
  plop.setActionType('addBlockImport', (answers, config, plop) => {
    const data: any = config?.data;

    const renderedPath = plop.renderString(data.path, answers);
    const filePath = resolve(renderedPath);
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
    const typeOnly = Boolean(data.typeOnly);

    let fromPkg = fromRendered.startsWith('src')
      ? toRelativePath(renderedPath, fromRendered)
      : fromRendered;
    if (fromPkg.endsWith('.ts'))
      fromPkg = fromPkg.slice(0, fromPkg.lastIndexOf('.'));
    if (!fromPkg) throw new Error('addBlockImport: `from` is required');
    if (!importName)
      throw new Error('addBlockImport: `importName` is required');
    if (!existsSync(filePath))
      throw new Error(`addBlockImport: file not found — ${filePath}`);

    const content = readFileSync(filePath, 'utf8');

    const escapedName = importName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const existsBlock = new RegExp(
      `^\\s*\\/\\/ <import name="${escapedName}">`,
      'm',
    );
    if (existsBlock.test(content)) {
      return `<import name="${importName}"> already present in ${renderedPath} — skipped`;
    }

    const endTag = /^([ \t]*)\/\/ <\/imports>/m;
    const endMatch = content.match(endTag);
    if (!endMatch) {
      throw new Error(
        `addBlockImport: <imports> closing tag not found in ${renderedPath}`,
      );
    }

    const indent = endMatch[1] ?? '';
    const block =
      `${indent}// <import name="${importName}">\n` +
      `${indent}import ${typeOnly ? 'type ' : ''}{ ${importName} } from '${fromPkg}';\n` +
      `${indent}// </import>\n`;

    const next = content.replace(endTag, `${block}${endMatch[0]}`);
    writeFileSync(filePath, next, 'utf8');
    return `Added <import name="${importName}"> from '${fromPkg}' to ${renderedPath}`;
  });
}
