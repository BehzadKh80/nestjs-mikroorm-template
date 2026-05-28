import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { listConfigProperties } from '../../../utils/functions';

export default function namePrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'list',
    name: 'name',
    message: 'property name:',
    choices: (answers) =>
      listConfigProperties(
        plop.renderString('{{kebabCase resourceName}}', answers),
      ),
  };
}
