## PR title

Follow [Conventional Commits](https://www.conventionalcommits.org/) specification:

### Non-release (no version bump or package release)

- `chore:` Other changes that don't modify src or test files
- `build:` Build system changes
- `ci:` CI configuration changes
- `docs:` Documentation changes
- `style:` Code style changes (formatting, etc.)
- `test:` Adding or modifying tests

### Patch version `_._.N`

- `fix:` A bug fix
- `perf:` Performance improvements
- `refactor:` Code refactoring
- `revert:` Revert a previous commit
- `tweak:` Minor change with no obvious end-user changes

### Minor version `_.N.0`

- `feat:` A new feature

### Major version `N.0.0`

- `!` after the type/scope, e.g. `feat!:`, `feat(api)!:`, `chore!:`
- `BREAKING CHANGE` in the commit body

---

## Description

<!-- Describe your changes -->

### Additional context

<!-- Any other information that would be useful -->
