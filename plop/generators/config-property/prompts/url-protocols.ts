import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';

export default function urlProtocolsPrompt(_plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'input',
    name: 'urlProtocols',
    message: 'url protocols (comma-separated, e.g. http,https):',
    default: 'http,https',
    when: (answers: Record<string, any>) => answers.type === 'url',
  };
}
