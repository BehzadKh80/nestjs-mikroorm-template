import type { NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

export default function removeBlockAction(plop: NodePlopAPI) {
  plop.setActionType('removeBlock', (answers, config, plop) => {
    const data: any = config?.data;
    const renderedPath = plop.renderString(data.path, answers);
    const filePath = resolve(renderedPath);
    const tag = plop.renderString(data.tag, answers);
    const name = plop.renderString(data.name, answers);
    const commentPrefix = plop.renderString(
      data.commentPrefix ?? '//',
      answers,
    );

    if (!tag) throw new Error('removeBlock: `tag` is required');
    if (!name) throw new Error('removeBlock: `name` is required');
    if (!existsSync(filePath))
      throw new Error(`removeBlock: file not found — ${filePath}`);

    const escapedTag = tag.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedName = name.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const escapedPrefix = commentPrefix.replace(
      /[.*+?^${}()|[\]\\]/g,
      '\\$&',
    );

    const pattern = new RegExp(
      `[ \\t]*${escapedPrefix} <${escapedTag} name="${escapedName}">[\\s\\S]*?[ \\t]*${escapedPrefix} <\\/${escapedTag}>\\n?`,
    );

    const content = readFileSync(filePath, 'utf8');
    if (!pattern.test(content)) {
      return `<${tag} name="${name}"> not found in ${renderedPath} — skipped`;
    }

    writeFileSync(filePath, content.replace(pattern, ''), 'utf8');
    return `Removed <${tag} name="${name}"> from ${renderedPath}`;
  });
}
