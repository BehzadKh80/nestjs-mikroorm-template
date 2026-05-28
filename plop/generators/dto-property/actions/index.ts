import type { ActionType, NodePlopAPI } from 'plop';

import importApiProperty from './import-api-property';
import addEnum from './add-enum';
import importEnum from './import-enum';
import appendDtoProperty from './append-dto-property';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    importApiProperty(plop),
    addEnum(plop),
    importEnum(plop),
    appendDtoProperty(plop),
  ];
}
