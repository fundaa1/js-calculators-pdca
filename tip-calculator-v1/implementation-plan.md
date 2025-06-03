# Tip Calculator Implementation Plan

## Phase 1: Basic Structure and Styling

1.  **Setup Project Files:**
    *   Create `index.html` for the basic structure.
    *   Create `css/style.css` for styling.
    *   Create `js/script.js` for JavaScript logic.
    *   **Status:** Done
    *   **Summary:** Created `implementation-plan.md`. Created `css` and `js` directories, and empty files `index.html`, `css/style.css`, and `js/script.js`.

2.  **HTML Structure (index.html):**
    *   Create input field for bill amount.
    *   Create buttons/selectors for standard tip percentages (15%, 18%, 20%).
    *   Create input field for custom tip percentage.
    *   Create input field for number of people to split the bill.
    *   Create display areas for calculated tip amount, total amount, and per-person amount.
    *   Add a toggle button/switch for dark mode.
    *   **Status:** Done
    *   **Summary:** Added input fields for bill, custom tip, and number of people. Added buttons for standard tip percentages. Added display areas for tip, total, and per-person amounts, and a dark mode toggle button.

3.  **Basic CSS Styling (css/style.css):**
    *   Apply basic styling for layout and readability (light theme).
    *   Ensure elements are identifiable for JavaScript interaction.
    *   **Status:**
    *   **Summary:**

## Phase 2: Core Logic - Tip Calculation

4.  **JavaScript: Tip Calculation (js/script.js):**
    *   Get bill amount from input.
    *   Get selected tip percentage (standard or custom).
    *   Calculate tip amount.
    *   Calculate total amount (bill + tip).
    *   Display tip amount and total amount.
    *   Handle custom tip percentage input.
    *   Add event listeners to input fields and tip selectors.
    *   **Status:**
    *   **Summary:**

## Phase 3: Bill Splitting

5.  **JavaScript: Bill Splitting (js/script.js):**
    *   Get number of people from input.
    *   Calculate per-person amount.
    *   Display per-person amount.
    *   Update per-person amount when bill, tip, or number of people changes.
    *   Handle cases where number of people is less than 1.
    *   **Status:**
    *   **Summary:**

## Phase 4: Dark Mode

6.  **CSS: Dark Mode Theme (css/style.css):**
    *   Define dark mode color palette.
    *   Create CSS rules for dark mode.
    *   **Status:**
    *   **Summary:**

7.  **JavaScript: Dark Mode Toggle (js/script.js):**
    *   Implement logic to toggle a class (e.g., `dark-mode`) on the `body` or main container.
    *   Add event listener to the dark mode toggle button.
    *   (Optional) Save user's theme preference using localStorage.
    *   **Status:**
    *   **Summary:**

## Phase 5: Responsiveness and Final Touches

8.  **CSS: Responsive Design (css/style.css):**
    *   Add media queries to ensure the layout adapts to different screen sizes (mobile, tablet, desktop).
    *   Test on various screen sizes.
    *   **Status:**
    *   **Summary:**

9.  **Refinements and Testing:**
    *   Input validation (e.g., ensure bill amount is a positive number).
    *   Edge case testing.
    *   Code cleanup and commenting where necessary (non-obvious parts).
    *   Final UI/UX review.
    *   **Status:**
    *   **Summary:** 