import type { ActionType, NodePlopAPI } from 'plop';

import addMiddleware from './add-middleware';
import addMiddlewareSpec from './add-middleware-spec';
import appendModuleImport from './append-module-import';
import appendModuleProvider from './append-module-provider';
import appendModuleExport from './append-module-export';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addMiddleware(plop),
    addMiddlewareSpec(plop),
    appendModuleImport(plop),
    appendModuleProvider(plop),
    appendModuleExport(plop),
  ];
}
