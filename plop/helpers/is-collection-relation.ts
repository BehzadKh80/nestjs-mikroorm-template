import type { NodePlopAPI } from 'plop';

export default function isCollectionRelation(plop: NodePlopAPI) {
  plop.setHelper('isCollectionRelation', function (kind: string): boolean {
    return kind === 'oneToMany' || kind === 'manyToMany';
  });
}
