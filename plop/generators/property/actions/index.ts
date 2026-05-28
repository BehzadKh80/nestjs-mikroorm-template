import type { ActionType, NodePlopAPI } from 'plop';

import importP from './import-p';
import importApiProperty from './import-api-property';
import addEnum from './add-enum';
import importEnum from './import-enum';
import importTargetEntityIntoEntity from './import-target-entity-into-entity';
import importTargetEntityIntoDomain from './import-target-entity-into-domain';
import importCollection from './import-collection';
import appendClassProperty from './append-class-property';
import appendEntityProperty from './append-entity-property';
import appendCreateDtoProperty from './append-create-dto-property';
import appendFixtureDtoProperty from './append-fixture-dto-property';
import appendFixtureEntityProperty from './append-fixture-entity-property';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    importP(plop),
    importApiProperty(plop),
    addEnum(plop),
    importEnum(plop),
    importTargetEntityIntoEntity(plop),
    importTargetEntityIntoDomain(plop),
    importCollection(plop),
    appendClassProperty(plop),
    appendEntityProperty(plop),
    appendCreateDtoProperty(plop),
    appendFixtureDtoProperty(plop),
    appendFixtureEntityProperty(plop),
  ];
}
