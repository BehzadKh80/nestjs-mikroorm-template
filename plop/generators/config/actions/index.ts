import type { ActionType, NodePlopAPI } from 'plop';

import addResourceFile from './add-resource-file';
import appendOptionsImport from './append-options-import';
import appendOptionsProvider from './append-options-provider';
import appendEnvResource from './append-env-resource';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addResourceFile(plop),
    appendOptionsImport(plop),
    appendOptionsProvider(plop),
    appendEnvResource(plop),
  ];
}
