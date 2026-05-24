import type { NodePlopAPI } from 'plop';

export default function isStringType(plop: NodePlopAPI) {
  plop.setHelper('isStringType', function (type: string) {
    return ['string', 'text', 'character'].includes(type);
  });
}
