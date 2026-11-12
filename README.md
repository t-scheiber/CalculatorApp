# Simple Calculator

A four-function calculator that runs as a static page, written in HTML, CSS and vanilla JavaScript. It has no build step and no runtime dependencies.

Live site: https://t-scheiber.github.io/CalculatorApp/

## What it does

- Adds, subtracts, multiplies and divides two numbers. Results chain: `2 + 3 =`, then `* 4 =` shows 20.
- Accepts decimal numbers, with one decimal point per operand.
- Starts a new entry when a digit follows `=`, and continues from the result when an operator follows `=`.
- Replaces the operator when a second one is pressed, and keeps the first operand.
- `AC` clears the display and the pending operation.
- Divides by zero without a check, so the display shows `Infinity`.
- Takes input from button clicks only. `script.js` has no keyboard handler.
- Uses a fixed 400 by 600 pixel box from `style.css`. The layout does not change with the screen size.

## Files

- `index.html`: the display and the 17 buttons.
- `style.css`: layout and colors.
- `script.js`: all calculator logic, started on `DOMContentLoaded`.
- `favicon.svg` and `favicon.png`: browser tab icons.
- `tests/calculator.test.mjs`: seven tests that run `script.js` in a Node VM with a stub DOM.
- `scripts/validate.mjs`: checks the asset links, button values, JavaScript syntax and that `package.json` lists no dependencies.
- `.github/`: a GitHub Actions workflow and scripts for Renovate pull requests.

## Requirements

- A web browser to use the calculator.
- Node.js 24.20.0 or later for the checks, as set in `engines` in `package.json`.

## Run it locally

Open `index.html` in a browser, or serve the folder with any static file server, for example `npx serve .`.

## Checks

```bash
npm test          # node --test tests/*.test.mjs
npm run validate  # node scripts/validate.mjs
```

Neither command installs anything, because the project has no dependencies and no lockfile.

## Deployment

GitHub Pages serves the `main` branch from the repository root. A push to `main` updates the live site.
