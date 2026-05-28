import type { ActionType, NodePlopAPI } from 'plop';

import importExpose from './import-expose';
import importTransform from './import-transform';
import importValidator from './import-validator';
import importHelper from './import-helper';
import importEnum from './import-enum';
import appendProperty from './append-property';
import appendEnvProperty from './append-env-property';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    importExpose(plop),
    importTransform(plop),
    importValidator(plop),
    importHelper(plop),
    importEnum(plop),
    appendProperty(plop),
    appendEnvProperty(plop),
  ];
}
