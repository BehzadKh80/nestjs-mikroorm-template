import type { ActionType, NodePlopAPI } from 'plop';

import addModule from './add-module';
import addService from './add-service';
import addServiceSpec from './add-service-spec';
import addController from './add-controller';
import addControllerSpec from './add-controller-spec';
import addCreateDto from './add-create-dto';
import addUpdateDto from './add-update-dto';
import addEntity from './add-entity';
import addDomain from './add-domain';
import addRepository from './add-repository';
import addCreateResponse from './add-create-response';
import addListResponse from './add-list-response';
import addDetailResponse from './add-detail-response';
import addUpdateResponse from './add-update-response';
import addDeleteResponse from './add-delete-response';
import appendAppImport from './append-app-import';
import appendAppModule from './append-app-module';
import addDto from './add-dto';

export default function actions(plop: NodePlopAPI): ActionType[] {
  return [
    addModule(plop),
    addService(plop),
    addServiceSpec(plop),
    addController(plop),
    addControllerSpec(plop),
    addCreateDto(plop),
    addUpdateDto(plop),
    addDto(plop),
    addEntity(plop),
    addDomain(plop),
    addRepository(plop),
    addCreateResponse(plop),
    addListResponse(plop),
    addDetailResponse(plop),
    addUpdateResponse(plop),
    addDeleteResponse(plop),
    appendAppImport(plop),
    appendAppModule(plop),
  ];
}
