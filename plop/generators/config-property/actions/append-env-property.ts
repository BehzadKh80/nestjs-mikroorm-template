import type { ActionType, NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

import { ENV_PATH } from '../constants';

export default function appendEnvProperty(_plop: NodePlopAPI): ActionType {
  return function envPropertyAction(answers, _config, plop): string {
    const filePath = resolve(ENV_PATH);
    if (!existsSync(filePath)) {
      throw new Error(`appendEnvProperty: ${ENV_PATH} not found`);
    }

    const resource = plop.renderString(
      '{{camelCase resourceName}}',
      answers as any,
    );
    const name = plop.renderString('{{camelCase name}}', answers as any);
    const envName = plop.renderString(
      '{{constantCase resourceName}}__{{constantCase name}}',
      answers as any,
    );
    const defaultValue = (answers as any).defaultValue ?? '';

    const block =
      `# <property name="${name}">\n` +
      `${envName}=${defaultValue}\n` +
      `# </property>\n`;

    const content = readFileSync(filePath, 'utf8');

    const resourceStart = content.indexOf(`# <resource name="${resource}">`);
    if (resourceStart === -1) {
      throw new Error(
        `appendEnvProperty: resource block "${resource}" not found in ${ENV_PATH}`,
      );
    }
    const resourceEnd = content.indexOf('# </resource>', resourceStart);
    if (resourceEnd === -1) {
      throw new Error(
        `appendEnvProperty: closing </resource> for "${resource}" missing`,
      );
    }
    const propertiesEnd = content.indexOf('# </properties>', resourceStart);
    if (propertiesEnd === -1 || propertiesEnd > resourceEnd) {
      throw new Error(
        `appendEnvProperty: </properties> marker missing in resource "${resource}"`,
      );
    }

    const next =
      content.slice(0, propertiesEnd) + block + content.slice(propertiesEnd);

    writeFileSync(filePath, next, 'utf8');
    return `Added env property "${name}" to resource "${resource}" in ${ENV_PATH}`;
  };
}
