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
import resourceGenerator from './resource';
import propertyGenerator from './property';
import rmPropertyGenerator from './rm-property';
import dependencyGenerator from './dependency';
import renameGenerator from './rename';

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
  dependencyGenerator,
  renameGenerator,
];

export default generators;
