import type { ActionType, NodePlopAPI } from 'plop';

import removeDtoFile from './remove-dto-file';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [removeDtoFile(plop)];
}
