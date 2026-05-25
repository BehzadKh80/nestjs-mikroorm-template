import type { NodePlopAPI } from 'plop';

export default function logicalGreaterThan(plop: NodePlopAPI) {
  plop.setHelper('gt', function (a: any, b: any) {
    return a > b;
  });
}
