import type { NodePlopAPI } from 'plop';

export default function isDbLength(plop: NodePlopAPI) {
  plop.setHelper('isDbLength', function (type: string) {
    return ['string', 'datetime', 'character'].includes(type);
  });
}
