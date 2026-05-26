import type { NodePlopAPI } from 'plop';

import { cascadeInjection } from '../utils/cascade';

export default function cascadeInjectionAction(plop: NodePlopAPI) {
  plop.setActionType('cascadeInjection', (answers, config, plop) => {
    const data: any = config?.data;
    const className = plop.renderString(data.className, answers);
    const excludeFiles: string[] = (data.excludeFiles ?? []).map(
      (p: string) => plop.renderString(p, answers),
    );

    if (!className) {
      throw new Error('cascadeInjection: `className` is required');
    }

    const report = cascadeInjection(className, excludeFiles);
    if (report.length === 0) {
      return `No injection sites of '${className}' found`;
    }
    const lines = report.map((r) => {
      const tail =
        r.importResult === 'removed'
          ? ' + import removed'
          : r.importResult === 'kept-still-used'
            ? ' (import still used, kept)'
            : '';
      return `  ${r.file}: -${r.removedBlocks} block(s)${tail}`;
    });
    return `Cascaded removal of '${className}' across ${report.length} file(s):\n${lines.join('\n')}`;
  });
}
