import type { ActionType, NodePlopAPI } from 'plop';

import addDto from './add-dto';
import importDtoInController from './import-dto-in-controller';
import importArgTypeInController from './import-arg-type-in-controller';
import appendRouteArgument from './append-route-argument';
import importDtoInService from './import-dto-in-service';
import importDtoInProvider from './import-dto-in-provider';
import appendServiceFunctionArgument from './append-service-function-argument';
import appendProviderFunctionArgument from './append-provider-function-argument';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addDto(plop),
    importDtoInController(plop),
    importArgTypeInController(plop),
    appendRouteArgument(plop),
    importDtoInService(plop),
    importDtoInProvider(plop),
    appendServiceFunctionArgument(plop),
    appendProviderFunctionArgument(plop),
  ];
}
