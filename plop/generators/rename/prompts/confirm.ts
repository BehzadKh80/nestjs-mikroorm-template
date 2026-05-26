import type { NodePlopAPI } from 'plop';
import { PromptQuestion } from '../../types/prompt-question';
import { RenameKind, scanRename } from '../../../utils/rename';

export default function confirmPrompt(plop: NodePlopAPI): PromptQuestion {
  return {
    type: 'confirm',
    name: 'confirm',
    message: (answers) => {
      const kind = answers.kind as RenameKind;
      const moduleName = plop.renderString(
        '{{kebabCase moduleName}}',
        answers,
      );
      const oldName = plop.renderString('{{kebabCase name}}', answers);
      const newName = plop.renderString('{{kebabCase newName}}', answers);
      const scan = scanRename(kind, moduleName, oldName, newName, true);
      const moves = scan.pathRenames.length
        ? '\n  moves:\n    ' +
          scan.pathRenames.map((m) => `${m.from} -> ${m.to}`).join('\n    ')
        : '\n  moves: (none)';
      const refs = scan.affectedFiles.length
        ? '\n  rewrites:\n    ' + scan.affectedFiles.join('\n    ')
        : '\n  rewrites: (none)';
      return `Rename ${scan.oldClass} -> ${scan.newClass}${moves}${refs}\nProceed?`;
    },
    default: false,
  };
}
