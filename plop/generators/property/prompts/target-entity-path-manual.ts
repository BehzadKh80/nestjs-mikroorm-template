import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function targetEntityPathManualPrompt(
  _plop: NodePlopAPI,
): PromptQuestion {
  return {
    type: 'input',
    name: 'targetEntityPath',
    message: 'enter target entity import path (e.g. src/modules/foo/domains/foo.ts):',
    when: (answers) =>
      answers.type === 'relation' && answers.targetEntityPath === 'manual',
  };
}
