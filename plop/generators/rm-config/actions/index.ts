import type { ActionType, NodePlopAPI } from 'plop';

import removeResourceFile from './remove-resource-file';
import removeOptionsImport from './remove-options-import';
import removeOptionsImportLine from './remove-options-import-line';
import removeOptionsProvider from './remove-options-provider';
import removeEnvResource from './remove-env-resource';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    removeOptionsProvider(plop),
    removeOptionsImport(plop),
    removeOptionsImportLine(plop),
    removeResourceFile(plop),
    removeEnvResource(plop),
  ];
}
