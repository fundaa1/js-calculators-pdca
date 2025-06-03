document.addEventListener('DOMContentLoaded', () => {
    const billAmountInput = document.getElementById('billAmount');
    const tipPercentButtons = document.querySelectorAll('.tip-percent-btn');
    const customTipPercentageInput = document.getElementById('customTipPercentage');
    const numberOfPeopleInput = document.getElementById('numberOfPeople');
    const tipAmountDisplay = document.getElementById('tipAmount');
    const totalAmountDisplay = document.getElementById('totalAmount');
    const amountPerPersonDisplay = document.getElementById('amountPerPerson');
    const themeToggleButton = document.getElementById('themeToggle'); // Uncommented and used

    let currentTipPercentage = 0.15; // Default to 15%
    let activeTipButton = document.querySelector('.tip-percent-btn[data-tip="0.15"]');
    if(activeTipButton) {
        activeTipButton.classList.add('active');
    }

    function resetOutputs() {
        tipAmountDisplay.textContent = '$0.00';
        totalAmountDisplay.textContent = '$0.00';
        amountPerPersonDisplay.textContent = '$0.00';
    }

    function calculateAndDisplay() {
        const billString = billAmountInput.value;
        const customTipString = customTipPercentageInput.value;
        const peopleString = numberOfPeopleInput.value;

        const bill = parseFloat(billString);
        let customTipPercent = parseFloat(customTipString);
        let people = parseInt(peopleString);

        // Validate Bill Amount
        if (isNaN(bill) || bill < 0 || billString.trim() === '') {
            resetOutputs();
            return;
        }

        // Validate Number of People
        if (isNaN(people) || people < 1 || peopleString.trim() === '') {
            people = 1; // Default to 1 if invalid or empty
            numberOfPeopleInput.value = '1'; // Reflect the change in the input field
        }

        let tipPercentageToUse = currentTipPercentage;

        // Validate and use Custom Tip Percentage
        if (!isNaN(customTipPercent) && customTipPercent >= 0 && customTipString.trim() !== '') {
            tipPercentageToUse = customTipPercent / 100;
            if (activeTipButton) {
                activeTipButton.classList.remove('active');
                activeTipButton = null;
            }
        } else if (customTipString.trim() !== '' && (isNaN(customTipPercent) || customTipPercent < 0)) {
            // Invalid custom tip (e.g. negative or non-numeric text)
            customTipPercentageInput.value = ''; // Clear invalid custom tip
            // Recalculate based on potentially active button or default
            // If an active button exists, its currentTipPercentage is already set
            // If no active button, currentTipPercentage holds the last valid tip rate or default
        } else if (activeTipButton) {
            customTipPercentageInput.value = ''; // Ensure custom tip is clear if a button is active
        }
         // If customTipString is empty, and an active button is selected, currentTipPercentage is used.
         // If customTipString is empty, and NO active button, currentTipPercentage (last selected/default) is used.


        const tipValue = bill * tipPercentageToUse;
        const totalValue = bill + tipValue;
        const perPersonValue = totalValue / people;

        tipAmountDisplay.textContent = `$${tipValue.toFixed(2)}`;
        totalAmountDisplay.textContent = `$${totalValue.toFixed(2)}`;
        amountPerPersonDisplay.textContent = `$${perPersonValue.toFixed(2)}`;
    }

    billAmountInput.addEventListener('input', calculateAndDisplay);

    customTipPercentageInput.addEventListener('input', () => {
        const customTipVal = parseFloat(customTipPercentageInput.value);
        const customTipString = customTipPercentageInput.value.trim();

        if (customTipString === '') {
            // If input is cleared, don't auto-select a tip button, allow re-calculation
            // which will use currentTipPercentage (from active button or last custom if it was valid)
        } else if (!isNaN(customTipVal) && customTipVal >= 0) {
            currentTipPercentage = 0; // Temp value to signal custom input is primary for calculateAndDisplay
            if (activeTipButton) {
                activeTipButton.classList.remove('active');
                activeTipButton = null;
            }
        } else {
            // Invalid input (e.g. text, or negative after already being negative)
            // calculateAndDisplay will handle clearing it if necessary
        }
        calculateAndDisplay();
    });

    numberOfPeopleInput.addEventListener('input', () => {
        // The primary validation is now within calculateAndDisplay
        // This listener just triggers recalculation.
        // Minor clean-up could be done here too, e.g., ensuring it's not empty before parseInt
        // but calculateAndDisplay's handling is more robust.
        calculateAndDisplay();
    });

    tipPercentButtons.forEach(button => {
        button.addEventListener('click', () => {
            if (activeTipButton) {
                activeTipButton.classList.remove('active');
            }
            button.classList.add('active');
            activeTipButton = button;
            currentTipPercentage = parseFloat(button.dataset.tip);
            customTipPercentageInput.value = ''; 
            calculateAndDisplay();
        });
    });

    // Theme Toggle Logic
    function applyTheme(theme) {
        if (theme === 'dark') {
            document.body.classList.add('dark-mode');
            themeToggleButton.textContent = 'Toggle Light Mode';
        } else {
            document.body.classList.remove('dark-mode');
            themeToggleButton.textContent = 'Toggle Dark Mode';
        }
    }

    themeToggleButton.addEventListener('click', () => {
        let currentTheme = localStorage.getItem('tipCalculatorTheme') || 'light';
        if (document.body.classList.contains('dark-mode')) { 
            currentTheme = 'light';
        } else {
            currentTheme = 'dark';
        }
        localStorage.setItem('tipCalculatorTheme', currentTheme);
        applyTheme(currentTheme);
    });

    const savedTheme = localStorage.getItem('tipCalculatorTheme');
    if (savedTheme) {
        applyTheme(savedTheme);
    } else {
        applyTheme('light'); 
    }

    calculateAndDisplay();
});
