import type { ActionType, NodePlopAPI } from 'plop';

import removeProperty from './remove-property';
import removeEnvProperty from './remove-env-property';
import cleanupImports from './cleanup-imports';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [removeProperty(plop), removeEnvProperty(plop), cleanupImports(plop)];
}
