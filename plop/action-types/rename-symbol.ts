import type { NodePlopAPI } from 'plop';

import { applyRename, RenameKind } from '../utils/rename';

export default function renameSymbolAction(plop: NodePlopAPI) {
  plop.setActionType('renameSymbol', (answers, config, plop) => {
    const data: any = config?.data;
    const kind = plop.renderString(data.kind, answers) as RenameKind;
    const moduleName = plop.renderString(data.moduleName ?? '', answers);
    const oldName = plop.renderString(data.oldName, answers);
    const newName = plop.renderString(data.newName, answers);
    const renameProperty = data.renameProperty ?? true;

    if (!kind) throw new Error('renameSymbol: `kind` is required');
    if (!oldName) throw new Error('renameSymbol: `oldName` is required');
    if (!newName) throw new Error('renameSymbol: `newName` is required');

    const result = applyRename(
      kind,
      moduleName,
      oldName,
      newName,
      renameProperty,
    );

    const movedLines = result.movedPaths.length
      ? '\n  moved:\n    ' +
        result.movedPaths.map((m) => `${m.from} -> ${m.to}`).join('\n    ')
      : '';
    const rewroteLines = result.rewrittenFiles.length
      ? '\n  rewrote ' +
        result.rewrittenFiles.length +
        ' file(s):\n    ' +
        result.rewrittenFiles.join('\n    ')
      : '\n  rewrote 0 files';
    return `Renamed ${result.oldClass} -> ${result.newClass}${rewroteLines}${movedLines}`;
  });
}
