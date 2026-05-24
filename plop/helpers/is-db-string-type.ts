import type { NodePlopAPI } from 'plop';

export default function isDbStringType(plop: NodePlopAPI) {
  plop.setHelper('isDbStringType', function (type: string) {
    return ['string', 'enum', 'text', 'character'].includes(type);
  });
}
