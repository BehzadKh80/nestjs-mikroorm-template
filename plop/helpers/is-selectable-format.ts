import type { NodePlopAPI } from 'plop';

export default function isSelectableFormat(plop: NodePlopAPI) {
  plop.setHelper('isSelectableFormat', function (format: string) {
    return [
      'IdentityCard',
      'PassportNumber',
      'IP',
      'PostalCode',
      'ISBN',
      'MobilePhone',
      'PhoneNumber',
      'Hash',
    ].includes(format);
  });
}
