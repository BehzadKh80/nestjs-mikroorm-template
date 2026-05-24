import type { NodePlopAPI } from 'plop';

export default function logicalAnd(plop: NodePlopAPI) {
  plop.setHelper('and', function (a: boolean, b: boolean) {
    return a && b;
  });
}
