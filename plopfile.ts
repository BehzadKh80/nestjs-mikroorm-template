import type { NodePlopAPI } from 'plop';

import helpers from './plop/helpers';
import actionTypes from './plop/action-types';
import generators from './plop/generators';

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
