import type { ActionType, NodePlopAPI } from 'plop';

import addService from './add-service';
import addServiceSpec from './add-service-spec';
import appendModuleImport from './append-module-import';
import appendModuleService from './append-module-service';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addService(plop),
    addServiceSpec(plop),
    appendModuleImport(plop),
    appendModuleService(plop),
  ];
}
