---
name: nestjs-eslint-fix
description: Fix ESLint errors and warnings in a NestJS (or any TypeScript/Node) project. Use this whenever the user wants to "fix lint errors", "clean up eslint", "make the linter pass", "resolve eslint warnings", or mentions a failing lint check / red lint output in a NestJS or TypeScript codebase. Use it even if the user just pastes ESLint output and asks for help, or says their CI lint step is failing. Handles both flat config (eslint.config.mjs) and legacy (.eslintrc) setups, applies safe auto-fixes first, then manually resolves the remainder.
---

# NestJS ESLint Fix

Fix ESLint problems in a NestJS / TypeScript project methodically: machine-fix what is safe, then hand-fix the rest without changing behavior.

## Core principle

ESLint's `--fix` only touches rules that are _auto-fixable and safe_ (formatting, import order, `const` vs `let`, etc.). Everything else needs a human-quality judgment call. The value of this skill is the second pass: fixing real issues (unused vars, floating promises, unsafe `any`, missing return types) **without altering runtime behavior**. Never silence a rule to make output green when the rule is pointing at a genuine bug.

## Workflow

### 1. Orient before touching anything

Find how linting is actually invoked and configured — don't assume.

```bash
# How is lint run?
cat package.json | grep -A2 '"lint"'

# Confirm the config (expected: flat config)
ls eslint.config.mjs eslint.config.* 2>/dev/null
```

This project uses **flat config** (`eslint.config.mjs`, ESLint 9+ — the NestJS default since late 2024). Read it to see which rule sets are extended and which severities/overrides are set, so your fixes match the project's actual config rather than generic defaults. If for some reason only a legacy `.eslintrc.*` is present, the same workflow applies — just read that config instead.

Note the lint script (commonly `eslint "{src,apps,libs,test}/**/*.ts" --fix` in NestJS). Reuse the project's own script/globs rather than inventing your own, so you respect its ignore patterns and target dirs.

In a monorepo (Nest `apps/`+`libs/`, or Nx/Turborepo), there may be multiple configs. Lint per-package using each package's own script.

### 2. Capture the baseline

Run the linter **without** fixing first, as JSON, so you have an exact inventory and can measure progress:

```bash
npx eslint "{src,apps,libs,test}/**/*.ts" --format json --output-file /tmp/eslint-before.json ; echo "exit: $?"
```

Then summarize counts by rule so you know what you're dealing with:

```bash
node -e 'const r=require("/tmp/eslint-before.json");const m={};let e=0,w=0;for(const f of r)for(const x of f.messages){m[x.ruleId]=(m[x.ruleId]||0)+1;x.severity===2?e++:w++}console.log("errors:",e,"warnings:",w);console.log(Object.entries(m).sort((a,b)=>b[1]-a[1]))'
```

If the project has a working `npm run lint`, prefer it (it carries the right config and globs); just append `--format json --output-file ...` for the inventory pass.

### 3. Apply safe auto-fixes

```bash
npm run lint   # if its script already includes --fix
# otherwise:
npx eslint "{src,apps,libs,test}/**/*.ts" --fix
```

Re-run the JSON inventory into `/tmp/eslint-after-autofix.json` and diff the counts. Report to the user how many were cleared automatically vs. what remains.

### 4. Fix the remainder by hand

Group the surviving problems by rule and fix each group properly. See `references/common-rules.md` for the right fix per rule — read it before hand-fixing, because the _correct_ fix for several common NestJS/TypeScript rules is non-obvious and the naive fix often introduces bugs (e.g. "fixing" `no-floating-promises` by deleting the call).

General rules for the manual pass:

- **Preserve behavior.** A lint fix is not a refactor. If a real fix would change behavior, stop and ask the user.
- **Prefer fixing over suppressing.** Reach for `// eslint-disable-next-line <rule> -- <reason>` only when the code is genuinely correct and the rule is a false positive. Always name the specific rule and give a reason; never use a bare blanket disable.
- **Never delete code to satisfy a rule** unless it is provably dead (e.g. a truly unused private with no DI/decorator significance). NestJS uses decorators and DI heavily — a seemingly "unused" constructor parameter may be an injected dependency. Check before removing.
- Edit files directly with precise edits; re-run lint on the touched files frequently to confirm each fix lands.

### 5. Verify

```bash
npx eslint "{src,apps,libs,test}/**/*.ts" ; echo "exit: $?"   # expect exit 0
```

Then run the project's other checks — both are part of this project's pipeline, so a lint fix must not break either:

```bash
npx tsc --noEmit ; echo "tsc exit: $?"          # must stay clean
npx prettier --check . ; echo "prettier exit: $?"
```

If Prettier reports formatting issues introduced by your edits, fix them with `npx prettier --write .` on the files you touched. ESLint `--fix` and Prettier can occasionally disagree on formatting; if they fight, the project's Prettier config wins — let Prettier format and ensure ESLint is configured to defer (`eslint-config-prettier`), don't hand-tweak whitespace back and forth.

### 6. Report

Summarize concisely: total problems before, auto-fixed count, hand-fixed count grouped by rule, anything suppressed (with the reason), and any item you deliberately left for the user with an explanation. If you changed behavior anywhere, flag it loudly.

## When to stop and ask

- A fix would change runtime behavior or public API.
- A rule appears misconfigured (e.g. the whole codebase violates it) — likely a config decision, not 500 individual bugs.
- Type errors surface that predate your changes.
- The "fix" is to disable a rule project-wide — that's the user's call, not yours.
