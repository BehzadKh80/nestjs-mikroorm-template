import type { NodePlopAPI } from 'plop';

export default function isRelation(plop: NodePlopAPI) {
  plop.setHelper('isRelation', function (type: string): boolean {
    return type === 'relation';
  });
}
