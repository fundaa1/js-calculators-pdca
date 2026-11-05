document.addEventListener('DOMContentLoaded', () => {
    const currency = document.getElementById('currency');
    const bill = document.getElementById('billAmount');
    const customTip = document.getElementById('customTipPercentage');
    const people = document.getElementById('numberOfPeople');
    const presets = document.querySelectorAll('.tip-percent-btn');
    const message = document.getElementById('inputMessage');
    const themeToggle = document.getElementById('themeToggle');
    const outputs = ['tipAmount', 'totalAmount', 'amountPerPerson']
        .map(id => document.getElementById(id));
    let selectedPreset = document.querySelector('[data-tip="0.15"]');

    function render() {
        const usesCustom = customTip.value !== '' || customTip.validity.badInput;
        for (const preset of presets) {
            const active = !usesCustom && preset === selectedPreset;
            preset.classList.toggle('active', active);
            preset.setAttribute('aria-pressed', String(active));
        }

        const invalid = [bill, customTip, people].find(input => !input.validity.valid);
        let values = ['—', '—', '—'];
        if (invalid) {
            message.textContent = invalid === bill ? 'Enter a nonnegative bill with up to two decimal places.'
                : invalid === customTip ? 'Enter a nonnegative tip with up to one decimal place.'
                : 'Enter a whole number of people, at least 1.';
        } else if (bill.value === '') {
            message.textContent = 'Enter the bill amount to calculate the tip.';
        } else {
            const rate = usesCustom ? customTip.valueAsNumber / 100 : Number(selectedPreset.dataset.tip);
            const tip = bill.valueAsNumber * rate;
            const total = bill.valueAsNumber + tip;
            if (Number.isFinite(total)) {
                const formatter = new Intl.NumberFormat('en-ZA', {
                    style: 'currency',
                    currency: currency.value
                });
                values = [tip, total, total / people.valueAsNumber].map(formatter.format);
                message.textContent = '';
            } else {
                message.textContent = 'Use a smaller bill or tip.';
            }
        }
        outputs.forEach((output, index) => { output.textContent = values[index]; });
    }

    [bill, customTip, people].forEach(input => input.addEventListener('input', render));
    currency.addEventListener('change', render);
    presets.forEach(preset => preset.addEventListener('click', () => {
        selectedPreset = preset;
        customTip.value = '';
        render();
    }));

    function applyTheme(dark) {
        document.body.classList.toggle('dark-mode', dark);
        themeToggle.textContent = dark ? 'Toggle Light Mode' : 'Toggle Dark Mode';
    }

    try {
        applyTheme(localStorage.getItem('tipCalculatorTheme') === 'dark');
    } catch {
        applyTheme(false);
    }
    themeToggle.addEventListener('click', () => {
        const dark = !document.body.classList.contains('dark-mode');
        applyTheme(dark);
        try {
            localStorage.setItem('tipCalculatorTheme', dark ? 'dark' : 'light');
        } catch {
            // The current page still supports theme changes without storage.
        }
    });

    render();
});
