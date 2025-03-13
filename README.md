# ProperDate.js

A simple, lightweight date object library for JavaScript/TypeScript, without the time and timezone nonsense.

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

# "Publish" this library locally (run in this directory)
yalc publish

# Link the locally "published" version of ProperDate.js (run in the consuming app/library)
## This will copy the local version of this library into the `.yalc` folder and modify your
## package.json to look for this library there.  You will want to add `.yalc` to your `.gitignore`,
## and be sure to change back to the real published version before shipping.
yalc add @jszymanowski/proper-date.js

```

### Publishing

Manual:

```bash
git tag v0.1.0
git push origin v0.1.0
```
