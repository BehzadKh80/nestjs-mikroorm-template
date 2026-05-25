import type { NodePlopAPI } from 'plop';

export default function logicalNotEqual(plop: NodePlopAPI) {
  plop.setHelper('neq', function (a: any, b: any) {
    return a !== b;
  });
}
