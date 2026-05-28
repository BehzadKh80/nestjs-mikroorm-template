import type { NodePlopAPI } from 'plop';
import { existsSync } from 'fs';
import { resolve } from 'path';

import { removeBlockAndCleanupImports } from '../utils/file-edit';

export default function removeBlockWithCleanupAction(plop: NodePlopAPI) {
  plop.setActionType('removeBlockWithCleanup', (answers, config, plop) => {
    const data: any = config?.data;

    const renderedPath = plop.renderString(data.path, answers);
    const filePath = resolve(renderedPath);
    const tag = plop.renderString(data.tag, answers);
    const name = plop.renderString(data.name, answers);

    if (!tag) throw new Error('removeBlockWithCleanup: `tag` is required');
    if (!name) throw new Error('removeBlockWithCleanup: `name` is required');
    if (!existsSync(filePath))
      throw new Error(`removeBlockWithCleanup: file not found — ${filePath}`);

    const result = removeBlockAndCleanupImports(filePath, tag, name);
    if (!result.removed) {
      return `<${tag} name="${name}"> not found in ${renderedPath} — skipped`;
    }

    const tail = result.cleanedImports.length
      ? `; cleaned unused imports: ${result.cleanedImports.join(', ')}`
      : '';
    return `Removed <${tag} name="${name}"> from ${renderedPath}${tail}`;
  });
}
