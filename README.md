# JS Calculators — tip calculator improvement

Open [the tip calculator](tip-calculator-v1/index.html) directly in a browser. It runs offline with no build, server, credentials, or external services. If viewing on GitHub, download or clone the repository first and open the local HTML file.

## PDCA-STEI recipe

| Stage | Action and evidence |
| --- | --- |
| Plan | Start from [upstream commit ab20c94](https://github.com/fundaa1/js-calculators/commit/ab20c94df872b51ff73817fe39460f83fd242b9e). With a $100 bill and 18% selected, enter a 10% custom tip, then clear it. The old code resets the remembered rate to zero. Scope the fix to the tip calculator. |
| Do | Clone the upstream history into a separate repository. Keep the last preset in its own state, derive the active rate from the current inputs, and use browser validation before rendering amounts. |
| Check | Run the acceptance walkthrough below. Run `node --check tip-calculator-v1/js/script.js` and `git diff --check` before delivery. |
| Act | Use the walkthrough as the commissioner review gate. If a case fails, record the actual values and return it to implementation. Revert the delivery commit if rollback is needed. |
| Standardise | Keep the behavior and handoff contracts below with the source. Update them in the same change when behavior changes. |
| Train | Give a reviewer the offline HTML and ask them to run the walkthrough in order. The custom tip temporarily overrides the remembered preset. |
| Enforce | Require syntax and whitespace checks and a recorded walkthrough result before accepting changes to this flow. This is a review gate. |
| Improve | Capture review feedback with the browser, inputs, expected and actual outputs. Use verified findings as the next Plan input. |

## Work and handoff contracts

- Codex owned source selection, cloning, implementation, documentation and verification. No work was delegated to another agent or person.
- The human commissioner owns acceptance. The review inputs are the browser preview, the contracts and the walkthrough. Record acceptance or return failing cases with actual results.
- A blank custom field restores the last selected preset, initially 15%. Custom 0% is valid. A preset click clears the custom field. The active preset exposes its state through `aria-pressed`.
- The bill uses nonnegative dollars and cents. The custom rate uses nonnegative percentage points with up to one decimal place. The party size must be a positive whole number. Invalid values stay visible for correction and replace calculated amounts with dashes.
- Tip, total and equal share are displayed to two decimal places. The displayed share is rounded independently, so multiplying it by the party size can differ from the total by a cent or more. Theme storage is optional and local to the browser.

## Commissioner walkthrough

| Action | Expected |
| --- | --- |
| Enter bill 100 and people 2 | Tip $15.00, total $115.00, share $57.50 |
| Select 18%, enter custom 10 | Tip $10.00, total $110.00, share $55.00 |
| Clear custom | 18% selected, tip $18.00, total $118.00, share $59.00 |
| Enter custom 0, then click 20% | Tip $0.00, then custom clears and tip becomes $20.00 |
| Set people to 1.5, then back to 2 | Validation message and dashes, then share $60.00 |
| Toggle the theme | Page changes theme and the button label updates |

## Execution record

- Delivery commit: `bf73726`. The clone retains upstream history and publishes to the separate public GitHub repository.
- Passed: JavaScript syntax check and Git whitespace check.
- Passed: Node smoke check using simulated browser events for default tip, custom override, preset restoration, zero tip, preset click, fractional party rejection, and pressed state.
- Pending: commissioner walkthrough in a real browser, including theme behavior, and acceptance.
