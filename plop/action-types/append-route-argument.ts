import type { NodePlopAPI } from 'plop';
import { existsSync, readFileSync, writeFileSync } from 'fs';
import { resolve } from 'path';

function escapeRe(s: string): string {
  return s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

export default function appendRouteArgumentAction(plop: NodePlopAPI) {
  plop.setActionType('appendRouteArgument', (answers, config, plop) => {
    const data: any = config?.data;

    const renderedPath = plop.renderString(data.path, answers);
    const filePath = resolve(renderedPath);
    const routeName = plop.renderString(data.routeName, answers);
    const argName = plop.renderString(data.argName, answers);
    const rendered = plop.renderString(data.template, answers);

    if (!routeName) throw new Error('appendRouteArgument: `routeName` required');
    if (!argName) throw new Error('appendRouteArgument: `argName` required');
    if (!existsSync(filePath))
      throw new Error(`appendRouteArgument: file not found — ${filePath}`);

    const content = readFileSync(filePath, 'utf8');

    const routeOpen = new RegExp(
      `\\/\\/ <route name="${escapeRe(routeName)}">`,
    );
    const routeOpenMatch = content.match(routeOpen);
    if (!routeOpenMatch) {
      throw new Error(
        `appendRouteArgument: <route name="${routeName}"> not found in ${renderedPath}`,
      );
    }
    const routeOpenIdx = routeOpenMatch.index!;

    const routeCloseRe = /\/\/ <\/route>/g;
    routeCloseRe.lastIndex = routeOpenIdx;
    const routeCloseMatch = routeCloseRe.exec(content);
    if (!routeCloseMatch) {
      throw new Error(
        `appendRouteArgument: </route> after "${routeName}" not found in ${renderedPath}`,
      );
    }
    const routeBlock = content.slice(routeOpenIdx, routeCloseMatch.index);

    const dup = new RegExp(
      `\\/\\/ <argument name="${escapeRe(argName)}">`,
    );
    if (dup.test(routeBlock)) {
      return `<argument name="${argName}"> already present in route "${routeName}" — skipped`;
    }

    const argsCloseRe = /^([ \t]*)\/\/ <\/arguments>/m;
    const inRouteArgsClose = routeBlock.match(argsCloseRe);
    if (!inRouteArgsClose) {
      throw new Error(
        `appendRouteArgument: <arguments> closing tag not found inside route "${routeName}" — regenerate the route or add the markers manually`,
      );
    }

    const indent = inRouteArgsClose[1] ?? '';
    const indented = rendered
      .split('\n')
      .map((line) => (line.length ? `${indent}${line}` : line))
      .join('\n')
      .replace(/\n$/, '');

    const localIdx = inRouteArgsClose.index!;
    const absoluteIdx = routeOpenIdx + localIdx;
    const next =
      content.slice(0, absoluteIdx) +
      `${indented}\n` +
      content.slice(absoluteIdx);

    writeFileSync(filePath, next, 'utf8');
    return `Added <argument name="${argName}"> to route "${routeName}" in ${renderedPath}`;
  });
}
