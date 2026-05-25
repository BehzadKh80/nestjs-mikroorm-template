import type { NodePlopAPI } from 'plop';
import { existsSync, rmSync } from 'fs';
import { resolve } from 'path';

export default function removePathAction(plop: NodePlopAPI) {
  plop.setActionType('removePath', (answers, config, plop) => {
    const data: any = config?.data;

    const rendered = plop.renderString(data.path, answers);
    const fullPath = resolve(rendered);

    if (!existsSync(fullPath)) {
      return `${rendered} not found — skipped`;
    }

    rmSync(fullPath, { recursive: true, force: true });
    return `Removed ${rendered}`;
  });
}
