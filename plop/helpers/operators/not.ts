import type { NodePlopAPI } from 'plop';

export default function logicalNot(plop: NodePlopAPI) {
  plop.setHelper('not', function (a: boolean) {
    return !a;
  });
}
