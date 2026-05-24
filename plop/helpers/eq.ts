import type { NodePlopAPI } from 'plop';

export default function logicalEqual(plop: NodePlopAPI) {
  plop.setHelper('eq', function (a: any, b: any) {
    return a === b;
  });
}
