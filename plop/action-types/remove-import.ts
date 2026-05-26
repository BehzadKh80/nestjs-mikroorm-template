import type { NodePlopAPI } from 'plop';
import { resolve } from 'path';

import { removeUnusedImportFromFile } from '../utils/file-edit';

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

    const result = removeUnusedImportFromFile(filePath, importName);
    switch (result) {
      case 'file-missing':
        throw new Error(`removeImport: file not found — ${filePath}`);
      case 'not-imported':
        return `${importName} not imported in ${renderedPath} — skipped`;
      case 'kept-still-used':
        return `${importName} still used in ${renderedPath} — skipped`;
      case 'removed':
        return `Removed '${importName}' import from ${renderedPath}`;
    }
  });
}
