import type { NodePlopAPI } from 'plop';

export default function logicalLessThan(plop: NodePlopAPI) {
  plop.setHelper('lt', function (a: any, b: any) {
    return a < b;
  });
}
