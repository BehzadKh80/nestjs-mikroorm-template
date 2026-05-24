import type { NodePlopAPI } from 'plop';

export default function isIntegerType(plop: NodePlopAPI) {
  plop.setHelper('isIntegerType', function (type: string) {
    return ['integer', 'smallint', 'bigint'].includes(type);
  });
}
