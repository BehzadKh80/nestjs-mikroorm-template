import type { NodePlopAPI } from 'plop';

export default function logicalGreaterThanOrEqual(plop: NodePlopAPI) {
  plop.setHelper('gte', function (a: any, b: any) {
    return a >= b;
  });
}
