import type { NodePlopAPI } from 'plop';
import moduleGenerator from './module';
import rmModuleGenerator from './rm-module';
import controllerGenerator from './controller';
import rmControllerGeneator from './rm-controller';
import serviceGenerator from './service';
import rmServiceGenerator from './rm-service';
import providerGenerator from './provider';
import rmProviderGenerator from './rm-provider';
import resourceGenerator from './resource';
import propertyGenerator from './property';
import rmPropertyGenerator from './rm-property';

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
];

export default generators;
