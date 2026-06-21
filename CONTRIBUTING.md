# Contributing

Thanks for wanting to contribute to Mr-Lube-Expert! A few guidelines to help your PR get merged quickly.

1. Fork the repository and create a branch with a descriptive name, e.g. `feature/add-foo` or `fix/typo`.
2. Keep commits focused and atomic; use conventional commit messages where possible.
3. Run the test suite and linter locally before opening a PR:

```bash
pnpm install
pnpm -s run lint --if-present
pnpm -s run typecheck --if-present
pnpm test --if-present
```

4. Open a Pull Request against `main`. Describe the purpose of the change and any migration steps.
5. A reviewer will request changes or approve; please keep PRs small to speed review.

Optional notes:
- If your change touches styling or formatting, run the project's formatter (e.g., Prettier) if present.
- Add tests for new features or bug fixes.

Thanks — maintainers will review as soon as possible.
