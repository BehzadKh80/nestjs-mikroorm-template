import type { NodePlopAPI } from 'plop';

export default function isDateType(plop: NodePlopAPI) {
  plop.setHelper('isDateType', function (type: string) {
    return ['datetime', 'date', 'time'].includes(type);
  });
}
