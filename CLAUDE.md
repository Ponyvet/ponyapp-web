# Claude Instructions

## Package Manager

- Always use **pnpm**.
- Never use npm or yarn.

## Scripts

Always use the scripts defined in `package.json` instead of running tools directly.

Available scripts:

- pnpm dev
- pnpm build
- pnpm lint
- pnpm preview
- pnpm typecheck
- pnpm knip
- pnpm knip:fix
- pnpm checks
- pnpm test
- pnpm test:watch
- pnpm test:coverage
- pnpm test:ui

Do not execute eslint, vite, tsc, vitest, or other tools directly if a script exists.

## Testing

Testing stack:

- Vitest
- MSW (Mock Service Worker)
- React Testing Library

Guidelines:

- Always use the existing testing setup.
- Global test configuration and mocks are located at:

src/test/setup.tsx

- Shared testing helpers and utilities are located at:

src/test/utils.tsx

## After Changes

After completing any code change or task:

- Always run:

pnpm checks

Fix any errors before considering the task complete.
