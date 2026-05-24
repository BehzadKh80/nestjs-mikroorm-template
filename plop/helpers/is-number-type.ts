import type { NodePlopAPI } from 'plop';

export default function isNumberType(plop: NodePlopAPI) {
  plop.setHelper('isNumberType', function (type: string) {
    return ['integer', 'float', 'smallint', 'bigint'].includes(type);
  });
}
