import type { ActionType, NodePlopAPI } from 'plop';

import removeDomainProperty from './remove-domain-property';
import removeEntityProperty from './remove-entity-property';
import removeCreateDtoProperty from './remove-create-dto-property';
import removeServiceSpecFixture from './remove-service-spec-fixture';
import removeControllerSpecFixture from './remove-controller-spec-fixture';
import removePImport from './remove-p-import';
import removeApiPropertyImport from './remove-api-property-import';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    removeDomainProperty(plop),
    removeEntityProperty(plop),
    removeCreateDtoProperty(plop),
    removeServiceSpecFixture(plop),
    removeControllerSpecFixture(plop),
    removePImport(plop),
    removeApiPropertyImport(plop),
  ];
}
