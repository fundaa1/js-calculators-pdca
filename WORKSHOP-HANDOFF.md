# Workshop handoff — JS Calculators

## Identity and scope

Source: https://github.com/fundaa1/js-calculators at `ab20c94df872b51ff73817fe39460f83fd242b9e`. Working copy: https://github.com/fundaa1/js-calculators-pdca, branch `main`. The relevant product is `tip-calculator-v1`. The commissioner owns acceptance. Codex performed the recorded changes without delegation.

## Changes

- `bf73726`: restore the selected tip preset after clearing a custom tip, validate inputs and document the first review recipe.
- `ff9061b`: record verification and the commissioner gate.
- `fa86512`: default to ZAR and offer USD, EUR and GBP display choices. Amounts do not convert.

The repository README contains the detailed PDCA-STEI recipe, input contracts and walkthrough. Open `tip-calculator-v1/index.html` locally in a browser. No server or credentials are required.

## Verification and acceptance

Syntax, whitespace and simulated event checks were reported passing. Currency switching was checked with simulated events. A full commissioner browser walkthrough and acceptance are not recorded. Verify the current code and results again before a new release.

## Maintenance and next action

First run the README walkthrough in a real browser, including validation, preset restoration, currency switching and theme, then capture the commissioner's decision. Future live exchange conversion is deferred. Before implementing it, agree on the rate source, refresh behavior, timestamp, failure handling and how conversions affect amounts. Preserve the existing display-only behavior until that work is approved and specified.

The selected currency does not represent an exchange rate. Money values are formatted to two decimal places and split shares are rounded independently. Theme storage is local and optional. For reuse, check source and asset licensing; no license grant is established in this record.

At each change update this handoff and the README contract, run `node --check tip-calculator-v1/js/script.js`, `git diff --check`, and the relevant browser walkthrough. Record actual results and next action.
