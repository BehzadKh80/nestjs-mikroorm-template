import type { NodePlopAPI } from 'plop';

import { cascadeModuleDep } from '../utils/cascade';

export default function cascadeModuleDepAction(plop: NodePlopAPI) {
  plop.setActionType('cascadeModuleDep', (answers, config, plop) => {
    const data: any = config?.data;
    const className = plop.renderString(data.className, answers);
    const excludeFiles: string[] = (data.excludeFiles ?? []).map(
      (p: string) => plop.renderString(p, answers),
    );

    if (!className) {
      throw new Error('cascadeModuleDep: `className` is required');
    }

    const report = cascadeModuleDep(className, excludeFiles);
    if (report.length === 0) {
      return `No dependents of '${className}' found`;
    }
    const lines = report.map((r) => {
      const tail =
        r.importResult === 'removed'
          ? ' + import removed'
          : r.importResult === 'kept-still-used'
            ? ' (import still used, kept)'
            : '';
      return `  ${r.file}: -${r.removedBlocks} tagged block(s)${tail}`;
    });
    return `Cascaded module-dep removal of '${className}' across ${report.length} file(s):\n${lines.join('\n')}`;
  });
}
