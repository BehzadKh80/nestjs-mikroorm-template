import inquirer from 'inquirer';
import nodePlop from 'node-plop';
import { resolve } from 'path';

type Action = 'add' | 'rm' | 'refactor';

type Domain =
  | 'Module'
  | 'HTTP layer'
  | 'Business logic'
  | 'Data'
  | 'Configuration'
  | 'Refactor'
  | 'Other';

const DOMAIN_ORDER: Domain[] = [
  'Module',
  'HTTP layer',
  'Business logic',
  'Data',
  'Configuration',
  'Refactor',
  'Other',
];

const DOMAIN_OF: Record<string, Domain> = {
  module: 'Module',
  resource: 'Module',
  dependency: 'Module',
  controller: 'HTTP layer',
  route: 'HTTP layer',
  guard: 'HTTP layer',
  middleware: 'HTTP layer',
  pipe: 'HTTP layer',
  service: 'Business logic',
  provider: 'Business logic',
  function: 'Business logic',
  dto: 'Data',
  'dto-property': 'Data',
  property: 'Data',
  config: 'Configuration',
  'config-property': 'Configuration',
  rename: 'Refactor',
};

function classify(name: string): { action: Action; domain: Domain } {
  if (name === 'rename') {
    return { action: 'refactor', domain: 'Refactor' };
  }
  const isRemove = name.startsWith('rm-');
  const root = isRemove ? name.slice(3) : name;
  const domain = DOMAIN_OF[root] ?? 'Other';
  return { action: isRemove ? 'rm' : 'add', domain };
}

const ACTION_CHOICES: { label: string; value: Action; hint: string }[] = [
  { label: 'Add', value: 'add', hint: 'scaffold something new' },
  { label: 'Remove', value: 'rm', hint: 'clean up an existing element' },
  { label: 'Refactor', value: 'refactor', hint: 'rename / restructure' },
];

async function main() {
  const plopfile = resolve('plopfile.ts');
  const plop = await nodePlop(plopfile);
  const allGens = plop.getGeneratorList();

  const directArg = process.argv[2];
  if (directArg) {
    await runGenerator(plop, directArg);
    return;
  }

  const { action } = await inquirer.prompt<{ action: Action }>([
    {
      type: 'list',
      name: 'action',
      message: 'action:',
      choices: ACTION_CHOICES.map((c) => ({
        name: `${c.label.padEnd(10)} — ${c.hint}`,
        value: c.value,
      })),
    },
  ]);

  const filtered = allGens
    .map((g) => ({ ...g, ...classify(g.name) }))
    .filter((g) => g.action === action);

  if (filtered.length === 0) {
    console.log(`No generators registered for "${action}".`);
    return;
  }

  const grouped = new Map<Domain, typeof filtered>();
  for (const g of filtered) {
    const list = grouped.get(g.domain) ?? [];
    list.push(g);
    grouped.set(g.domain, list);
  }

  const nameWidth = Math.max(...filtered.map((g) => g.name.length));
  const choices: any[] = [];
  for (const domain of DOMAIN_ORDER) {
    const gens = grouped.get(domain);
    if (!gens || gens.length === 0) continue;
    choices.push(new inquirer.Separator(`── ${domain} ──`));
    for (const g of gens.sort((a, b) => a.name.localeCompare(b.name))) {
      choices.push({
        name: `  ${g.name.padEnd(nameWidth)}  ${g.description ?? ''}`,
        value: g.name,
        short: g.name,
      });
    }
  }

  const { name } = await inquirer.prompt<{ name: string }>([
    {
      type: 'list',
      name: 'name',
      message: `${action}:`,
      choices,
      pageSize: Math.min(30, choices.length + 2),
    },
  ]);

  await runGenerator(plop, name);
}

async function runGenerator(
  plop: Awaited<ReturnType<typeof nodePlop>>,
  name: string,
) {
  const gen = plop.getGenerator(name);
  if (!gen) {
    console.error(`Unknown generator: ${name}`);
    process.exit(1);
  }
  const answers = await (gen as any).runPrompts();
  const result = await (gen as any).runActions(answers);

  for (const change of result.changes ?? []) {
    const path = change.path ? ` ${change.path}` : '';
    const msg = change.message ? ` — ${change.message}` : '';
    console.log(`✔ ${change.type}${path}${msg}`);
  }
  for (const failure of result.failures ?? []) {
    const path = failure.path ? ` ${failure.path}` : '';
    const err = failure.error ? ` — ${failure.error}` : '';
    console.log(`✖ ${failure.type ?? 'action'}${path}${err}`);
  }
}

main().catch((err) => {
  if (err && (err.name === 'ExitPromptError' || err.code === 'SIGINT')) {
    process.exit(130);
  }
  console.error(err);
  process.exit(1);
});
