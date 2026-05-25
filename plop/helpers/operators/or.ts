import type { NodePlopAPI } from 'plop';

export default function logicalOr(plop: NodePlopAPI) {
  plop.setHelper('or', function (a: boolean, b: boolean) {
    return a || b;
  });
}
