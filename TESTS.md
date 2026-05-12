# TESTS.md

## Automated Tests

This project uses **Vitest** for unit testing the core logic and **Testing Library** for component verification.

### Audit Engine Tests
- **File**: `src/lib/audit-engine.test.ts`
- **Coverage**: 
  - Downgrade logic for Cursor Teams.
  - Optimization logic for Copilot Enterprise.
  - Alternative tool suggestions based on Use Case.
  - Handling of optimal stacks (zero-savings cases).
  - Scale handling for larger team sizes.

### How to run tests
```bash
# Run all tests once
npm run test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage
```

### CI Integration
Tests are automatically run on every push to `main` via the GitHub Actions workflow defined in `.github/workflows/ci.yml`.
