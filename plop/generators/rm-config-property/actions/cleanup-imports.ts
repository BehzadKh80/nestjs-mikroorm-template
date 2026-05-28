import type { ActionType, NodePlopAPI } from 'plop';
import { resolve } from 'path';

import { removeUnusedImportFromFile } from '../../../utils/file-edit';

const CANDIDATE_SYMBOLS = [
  'IsString',
  'IsNumber',
  'IsBoolean',
  'IsUrl',
  'IsEnum',
  'transformString',
  'transformNumber',
  'transformBoolean',
];

export default function cleanupImports(_plop: NodePlopAPI): ActionType {
  return function action(answers, _config, plop): string {
    if (!(answers as any).confirm) {
      return 'cleanup-imports - aborted by user';
    }
    const renderedPath = plop.renderString(
      'src/modules/config/resources/{{kebabCase resourceName}}-resource.ts',
      answers as any,
    );
    const filePath = resolve(renderedPath);
    const removed: string[] = [];
    for (const sym of CANDIDATE_SYMBOLS) {
      const result = removeUnusedImportFromFile(filePath, sym);
      if (result === 'removed') removed.push(sym);
    }
    return removed.length
      ? `Cleaned unused imports: ${removed.join(', ')}`
      : 'No unused imports to clean';
  };
}
