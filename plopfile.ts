import type { NodePlopAPI } from 'plop';

import helpers from './plop/helpers';
import actionTypes from './plop/action-types';
import moduleGenerator from './plop/generators/module';
import controllerGenerator from './plop/generators/controller';
import serviceGenerator from './plop/generators/service';
import providerGenerator from './plop/generators/provider';
import resourceGenerator from './plop/generators/resource';
import propertyGenerator from './plop/generators/property';

const generators: ((plop: NodePlopAPI) => void)[] = [
  resourceGenerator,
  propertyGenerator,
  moduleGenerator,
  serviceGenerator,
  providerGenerator,
  controllerGenerator,
];

export default async function (plop: NodePlopAPI) {
  for (const helper of helpers) {
    helper(plop);
  }

  for (const actionType of actionTypes) {
    actionType(plop);
  }

  for (const generator of generators) {
    generator(plop);
  }
}
