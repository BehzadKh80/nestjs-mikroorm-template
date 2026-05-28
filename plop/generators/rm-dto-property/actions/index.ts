import type { ActionType, NodePlopAPI } from 'plop';

import removeDtoProperty from './remove-dto-property';
import removeApiPropertyImport from './remove-api-property-import';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [removeDtoProperty(plop), removeApiPropertyImport(plop)];
}
