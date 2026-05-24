import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

import { STRING_TYPES } from '../constants';

export default function formatPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'format',
    message: 'string format:',
    choices: [
      'skip',
      'Alpha',
      'Alphanumeric',
      'Decimal',
      'Ascii',
      'Base32',
      'Base58',
      'Base64',
      'IBAN',
      'BIC',
      'CreditCard',
      'Currency',
      'ISO4217CurrencyCode',
      'EthereumAddress',
      'BtcAddress',
      'DataURI',
      'Email',
      'FQDN',
      'FullWidth',
      'HalfWidth',
      'VariableWidth',
      'HexColor',
      'HSL',
      'RgbColor',
      'IdentityCard',
      'PassportNumber',
      'PostalCode',
      'Hexadecimal',
      'Octal',
      'MACAddress',
      'IP',
      'Port',
      'ISBN',
      'EAN',
      'ISIN',
      'ISO8601',
      'JSON',
      'JWT',
      'Lowercase',
      'LatLong',
      'Latitude',
      'Longitude',
      'MobilePhone',
      'ISO6391',
      'ISO31661Alpha2',
      'ISO31661Alpha3',
      'ISO31661Numeric',
      'Locale',
      'PhoneNumber',
      'MongoId',
      'Multibyte',
      'NumberString',
      'SurrogatePair',
      'TaxId',
      'Url',
      'MagnetURI',
      'FirebasePushId',
      'Uppercase',
      'MilitaryTime',
      'TimeZone',
      'Hash',
      'MimeType',
      'SemVer',
      'ISSN',
      'ISRC',
      'RFC3339',
      'StrongPassword',
    ],
    default: 0,
    when: (answers) => {
      if (!answers.addValidator) {
        return false;
      }
      if (STRING_TYPES.includes(answers.type)) {
        return true;
      }
      return false;
    },
  };
}
