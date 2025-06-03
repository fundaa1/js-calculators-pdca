# NeoCalc

NeoCalc is a sophisticated, modern calculator with an intuitive interface and advanced features. Built with HTML, CSS, and vanilla JavaScript, it showcases modern design principles while providing powerful functionality. This calculator goes beyond basic operations with a sleek UI, animations, and user-friendly features.

## Core Functionality

*   **Basic Operations**: Addition, subtraction, multiplication, and division.
*   **Extended Operations**: Percentage calculations (%) and sign toggling (±).
*   **Error Handling**: Graceful handling of division by zero and other calculation errors (e.g., resulting in Infinity), displaying an "Error" message.
*   **Clear Functions**: Both AC (All Clear) to reset the entire calculator state and DEL (Delete) to remove the last entered digit.

## Advanced Features

*   **Calculation History**: Tracks and displays a list of your previous calculations. This history is scrollable.
*   **Dark/Light Theme**: Toggle between a light and a dark theme for comfortable viewing in any environment. Your theme preference is saved.
*   **Responsive Design**: Adapts for a good user experience on various device sizes, from mobile to desktop.
*   **Keyboard Support**: Use your physical keyboard for rapid calculations (numbers, operators, Enter for equals, Escape for AC, Backspace for DEL, % for percentage).
*   **Visual Feedback**: Subtle animations and shadow effects on button presses enhance the user experience.
*   **Local Storage**: Your calculation history and theme preference persist between sessions.

## Design Features

*   **Modern UI**: Clean, intuitive interface with a focus on usability, featuring a neumorphic-inspired design.
*   **3D Effects**: Subtle shadows and hover/active effects on buttons create a sense of depth.
*   **Micro-interactions**: Responsive feedback for user actions, like button presses.
*   **Accessibility**: Includes ARIA attributes for better screen reader compatibility and aims for good color contrast in both themes. Keyboard navigation is supported.
*   **Color Themes**: Carefully designed color schemes for both light and dark modes using CSS custom properties.

## Technologies Used

*   **HTML5**: Semantic markup for structure and accessibility.
*   **CSS3**: Advanced styling with custom properties, CSS Grid for layout, transitions, and responsive design (media queries).
*   **JavaScript (ES6+)**: Modern JavaScript for all calculator logic, DOM manipulation, event handling, and feature implementation.
*   **Font Awesome**: Icon library used for enhancing visual elements on buttons.
*   **Google Fonts**: Custom typography with 'Poppins' for the general UI and 'Roboto Mono' for the calculator display and history log.
*   **LocalStorage API**: Client-side persistent storage for calculation history and theme preference.

## Design Philosophy Implemented

*   **Beautiful Simplicity**: Clean interface with subtle depth and dimensionality.
*   **Intuitive Interaction**: Natural user flow with visual and motion feedback.
*   **Modern Aesthetics**: Contemporary design with attention to typography, color, and neumorphic cues.
*   **Responsive Adaptation**: Aims for a seamless experience across common device sizes.
*   **Progressive Enhancement**: Core functionality works widely, with enhanced visual features where supported.

## Setup and Usage

1.  **Clone the repository (or download the files):**
    If this were a git repository:
    ```bash
    git clone <repository-url>
    cd neocalc-v1
    ```
    Otherwise, simply ensure all files (`index.html`, `style.css`, `script.js`) are in the `neocalc-v1` directory.

2.  **Open `index.html`:**
    Open the `index.html` file in your web browser to use the calculator.

## How to Use

*   Click the buttons on the screen or use your keyboard for input.
*   The display shows your current number or result. The line above it shows the context of an ongoing operation or the last calculation that led to an error.
*   A history of your completed calculations is shown in the panel below the calculator.
*   Toggle between Light and Dark themes using the theme button (sun/moon icon).
*   Use 'AC' (All Clear) or the 'Escape' key to reset everything.
*   Use 'DEL' (Delete) or the 'Backspace' key to remove the last digit from your current input.
