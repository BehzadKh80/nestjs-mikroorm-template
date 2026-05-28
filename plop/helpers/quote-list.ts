import type { NodePlopAPI } from 'plop';

export default function quoteList(plop: NodePlopAPI) {
  plop.setHelper('quoteList', function (csv: string): string {
    if (!csv) return '';
    return csv
      .split(',')
      .map((s) => s.trim())
      .filter(Boolean)
      .map((s) => `'${s}'`)
      .join(', ');
  });
}
