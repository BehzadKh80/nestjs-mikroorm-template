import type { NodePlopAPI } from 'plop';
import moduleGenerator from './module';
import rmModuleGenerator from './rm-module';
import controllerGenerator from './controller';
import rmControllerGeneator from './rm-controller';
import serviceGenerator from './service';
import rmServiceGenerator from './rm-service';
import providerGenerator from './provider';
import rmProviderGenerator from './rm-provider';
import guardGenerator from './guard';
import rmGuardGenerator from './rm-guard';
import middlewareGenerator from './middleware';
import rmMiddlewareGenerator from './rm-middleware';
import pipeGenerator from './pipe';
import rmPipeGenerator from './rm-pipe';
import routeGenerator from './route';
import rmRouteGenerator from './rm-route';
import functionGenerator from './function';
import rmFunctionGenerator from './rm-function';
import dtoGenerator from './dto';
import rmDtoGenerator from './rm-dto';
import dtoPropertyGenerator from './dto-property';
import rmDtoPropertyGenerator from './rm-dto-property';
import resourceGenerator from './resource';
import propertyGenerator from './property';
import rmPropertyGenerator from './rm-property';
import dependencyGenerator from './dependency';
import renameGenerator from './rename';
import configGenerator from './config';
import configPropertyGenerator from './config-property';
import rmConfigGenerator from './rm-config';
import rmConfigPropertyGenerator from './rm-config-property';

const generators: ((plop: NodePlopAPI) => void)[] = [
  resourceGenerator,
  propertyGenerator,
  rmPropertyGenerator,
  moduleGenerator,
  rmModuleGenerator,
  serviceGenerator,
  rmServiceGenerator,
  controllerGenerator,
  rmControllerGeneator,
  providerGenerator,
  rmProviderGenerator,
  guardGenerator,
  rmGuardGenerator,
  middlewareGenerator,
  rmMiddlewareGenerator,
  pipeGenerator,
  rmPipeGenerator,
  routeGenerator,
  rmRouteGenerator,
  functionGenerator,
  rmFunctionGenerator,
  dtoGenerator,
  rmDtoGenerator,
  dtoPropertyGenerator,
  rmDtoPropertyGenerator,
  configGenerator,
  configPropertyGenerator,
  rmConfigGenerator,
  rmConfigPropertyGenerator,
  dependencyGenerator,
  renameGenerator,
];

export default generators;
