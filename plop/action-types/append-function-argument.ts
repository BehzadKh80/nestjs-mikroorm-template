import type { NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function appendFunctionArgumentAction(plop: NodePlopAPI) {
  plop.setActionType('appendFunctionArgument', (answers, config, plop) => {
    const data: any = config?.data;

    const renderedPath = plop.renderString(data.path, answers);
    const filePath = resolve(renderedPath);
    const functionName = plop.renderString(data.functionName, answers);
    const argName = plop.renderString(data.argName, answers);
    const rendered = plop.renderString(data.template, answers);

    if (!functionName)
      throw new Error('appendFunctionArgument: `functionName` required');
    if (!argName) throw new Error('appendFunctionArgument: `argName` required');
    if (!existsSync(filePath))
      throw new Error(`appendFunctionArgument: file not found — ${filePath}`);

    const content = readFileSync(filePath, 'utf8');

    const fnOpen = new RegExp(
      `\\/\\/ <function name="${escapeRe(functionName)}">`,
    );
    const fnOpenMatch = content.match(fnOpen);
    if (!fnOpenMatch) {
      throw new Error(
        `appendFunctionArgument: <function name="${functionName}"> not found in ${renderedPath}`,
      );
    }
    const fnOpenIdx = fnOpenMatch.index!;

    const fnCloseRe = /\/\/ <\/function>/g;
    fnCloseRe.lastIndex = fnOpenIdx;
    const fnCloseMatch = fnCloseRe.exec(content);
    if (!fnCloseMatch) {
      throw new Error(
        `appendFunctionArgument: </function> after "${functionName}" not found in ${renderedPath}`,
      );
    }
    const fnBlock = content.slice(fnOpenIdx, fnCloseMatch.index);

    const dup = new RegExp(`\\/\\/ <argument name="${escapeRe(argName)}">`);
    if (dup.test(fnBlock)) {
      return `<argument name="${argName}"> already present in function "${functionName}" — skipped`;
    }

    const argsCloseRe = /^([ \t]*)\/\/ <\/arguments>/m;
    const inFnArgsClose = fnBlock.match(argsCloseRe);
    if (!inFnArgsClose) {
      throw new Error(
        `appendFunctionArgument: <arguments> closing tag not found inside function "${functionName}" — regenerate the function or add markers manually`,
      );
    }

    const indent = inFnArgsClose[1] ?? '';
    const indented = rendered
      .split('\n')
      .map((line) => (line.length ? `${indent}${line}` : line))
      .join('\n')
      .replace(/\n$/, '');

    const localIdx = inFnArgsClose.index!;
    const absoluteIdx = fnOpenIdx + localIdx;
    const next =
      content.slice(0, absoluteIdx) +
      `${indented}\n` +
      content.slice(absoluteIdx);

    writeFileSync(filePath, next, 'utf8');
    return `Added <argument name="${argName}"> to function "${functionName}" in ${renderedPath}`;
  });
}
