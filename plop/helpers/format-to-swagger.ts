import type { NodePlopAPI } from 'plop';

export default function format2Swagger(plop: NodePlopAPI) {
  plop.setHelper(
    'format2Swagger',
    function (
      format: string,
      formatOption: string | undefined,
    ): string | undefined {
      if (format === 'Email') {
        return 'email';
      } else if (format === 'StrongPassword') {
        return 'password';
      } else if (format === 'IP') {
        if (formatOption === '4') {
          return 'ipv4';
        } else {
          return 'ipv6';
        }
      } else if (format === 'FQDN') {
        return 'idn-hostname';
      } else if (format === 'Url') {
        return 'uri';
      }
      return undefined;
    },
  );
}
