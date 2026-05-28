import type { ActionType, NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

const ENV_PATH = '.env.example';

export default function removeEnvProperty(_plop: NodePlopAPI): ActionType {
  return function action(answers, _config, plop): string {
    if (!(answers as any).confirm) {
      return 'remove-env-property - aborted by user';
    }
    const filePath = resolve(ENV_PATH);
    if (!existsSync(filePath)) {
      throw new Error(`removeEnvProperty: ${ENV_PATH} not found`);
    }

    const resource = plop.renderString(
      '{{camelCase resourceName}}',
      answers as any,
    );
    const propertyName = plop.renderString(
      '{{camelCase name}}',
      answers as any,
    );

    const content = readFileSync(filePath, 'utf8');
    const resourceStart = content.indexOf(`# <resource name="${resource}">`);
    if (resourceStart === -1) {
      return `resource "${resource}" not found in ${ENV_PATH} — skipped`;
    }
    const resourceEnd = content.indexOf('# </resource>', resourceStart);

    const escName = propertyName.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const blockRe = new RegExp(
      `[ \\t]*# <property name="${escName}">[\\s\\S]*?[ \\t]*# <\\/property>\\n?`,
    );

    const region = content.slice(resourceStart, resourceEnd);
    if (!blockRe.test(region)) {
      return `<property name="${propertyName}"> not found in resource "${resource}" — skipped`;
    }
    const newRegion = region.replace(blockRe, '');
    const next =
      content.slice(0, resourceStart) +
      newRegion +
      content.slice(resourceEnd);
    writeFileSync(filePath, next, 'utf8');
    return `Removed env property "${propertyName}" from resource "${resource}" in ${ENV_PATH}`;
  };
}
