import type { NodePlopAPI } from 'plop';

export default function logicalAnd(plop: NodePlopAPI) {
  plop.setHelper('and', function (...args: any[]) {
    args.pop();
    return args.every(Boolean);
  });
}
