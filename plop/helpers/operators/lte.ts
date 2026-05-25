import type { NodePlopAPI } from 'plop';

export default function logicalLessThanOrEqual(plop: NodePlopAPI) {
  plop.setHelper('lte', function (a: any, b: any) {
    return a <= b;
  });
}
