import type { NodePlopAPI } from 'plop';

export default function logicalOr(plop: NodePlopAPI) {
  plop.setHelper('or', function (...args: any[]) {
    args.pop();
    return args.some(Boolean);
  });
}
