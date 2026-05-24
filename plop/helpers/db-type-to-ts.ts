import type { NodePlopAPI } from 'plop';

export default function dbType2Ts(plop: NodePlopAPI) {
  plop.setHelper('dbType2Ts', function (type: string) {
    const numberTypes = ['integer', 'float', 'smallint', 'bigint'];
    const dateTypes = ['datetime', 'date', 'time'];
    const stringTypes = ['string', 'uuid', 'enum', 'character', 'text'];
    if (stringTypes.includes(type)) {
      return 'string';
    } else if (numberTypes.includes(type)) {
      return 'number';
    } else if (dateTypes.includes(type)) {
      return 'Date';
    } else if (type === 'json') {
      return 'Record<string, any>';
    } else if (type === 'enum') {
    } else if (type === 'boolean') {
      return 'boolean';
    } else {
      return 'any';
    }
  });
}
