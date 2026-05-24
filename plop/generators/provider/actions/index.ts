import type { ActionType, NodePlopAPI } from 'plop';

import addProvider from './add-provider';
import addProviderSpec from './add-provider-spec';
import appendModuleImport from './append-module-import';
import appendModuleProvider from './append-module-provider';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addProvider(plop),
    addProviderSpec(plop),
    appendModuleImport(plop),
    appendModuleProvider(plop),
  ];
}
