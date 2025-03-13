# ProperDate.js

A simple, lightweight date object library for JavaScript/TypeScript, without the time and timezone nonsense.

[![codecov](https://codecov.io/gh/jszymanowski/proper-date.js/branch/main/graph/badge.svg)](https://codecov.io/gh/jszymanowski/proper-date.js)

## Usage

```js
import ProperDate from "@jszymanowski/proper-date.js";

const date = ProperDate("2024-12-25");
date.formatted; // '2024-12-25'

// and so on
```

## Package management

### Local testing

Testing this package as a dependency is easy with [Yalc](https://github.com/wclr/yalc):

```bash
# Install (depending on your preferred package manager)
npm i yalc -g
yarn global add yalc
pnpm add -g yalc

# Build this library, as usual:
pnpm build

# "Publish" this library locally (run in this directory)
yalc publish

# Link the locally "published" version of ProperDate.js (run in the consuming app/library)
## This will copy the local version of this library into the `.yalc` folder and modify your
## package.json to look for this library there.  You will want to add `.yalc` to your `.gitignore`,
## and be sure to change back to the real published version before shipping.
yalc add @jszymanowski/proper-date.js

# As needed: update the locally "published" package
yalc update @jszymanowski/proper-date.js
yalc update # all packages in yalc.lock

# When done
## In consuming app/library:
yalc remove @jszymanowski/proper-date.js
yalc remove --all # all packages in yalc.lock

## In this package:
yalc installations clean @jszymanowski/proper-date.js # unpublish / reverts yalc publish
```

### Publishing

Manual:

```bash
git tag v0.1.0
git push origin v0.1.0
```
