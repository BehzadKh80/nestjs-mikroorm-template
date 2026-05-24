import type { ActionType, NodePlopAPI } from 'plop';

import importP from './import-p';
import importApiProperty from './import-api-property';
import importApiPropertyOptional from './import-api-property-optional';
import importExpose from './import-expose';
import importIsOptional from './import-is-optional';
import addEnum from './add-enum';
import importEnum from './import-enum';
import importIsEnum from './import-is-enum';
import importIsString from './import-is-string';
import importMaxLength from './import-max-length';
import importMinLength from './import-min-length';
import importFormat from './import-format';
import importMax from './import-max';
import importMin from './import-min';
import importIsNumber from './import-is-number';
import importIsArray from './import-is-array';
import importArrayMaxSize from './import-array-max-size';
import importArrayMinSize from './import-array-min-size';
import importIsBoolean from './import-is-boolean';
import importIsUuid from './import-is-uuid';
import importIsDate from './import-is-date';
import importIsNotEmpty from './import-is-not-empty';
import appendClassProperty from './append-class-property';
import appendEntityProperty from './append-entity-property';
import appendCreateDtoProperty from './append-create-dto-property';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    importP(plop),
    importApiProperty(plop),
    importApiPropertyOptional(plop),
    importExpose(plop),
    importIsOptional(plop),
    addEnum(plop),
    importEnum(plop),
    importIsEnum(plop),
    importIsString(plop),
    importMaxLength(plop),
    importMinLength(plop),
    importFormat(plop),
    importMax(plop),
    importMin(plop),
    importIsNumber(plop),
    importIsArray(plop),
    importArrayMaxSize(plop),
    importArrayMinSize(plop),
    importIsBoolean(plop),
    importIsUuid(plop),
    importIsDate(plop),
    importIsNotEmpty(plop),
    appendClassProperty(plop),
    appendEntityProperty(plop),
    appendCreateDtoProperty(plop),
  ];
}
