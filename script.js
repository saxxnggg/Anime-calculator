// [Previous JavaScript code remains the same until the calculate function]

function calculate() {
    const history = document.getElementById('history');
    try {
        const calculation = result.value;
        const answer = eval(calculation);
        history.textContent = calculation;
        result.value = answer;
        characterReaction('excited');
    } catch (error) {
        history.textContent = '';
        result.value = 'Error';
        characterReaction('angry');
    }
}

// [Rest of the JavaScript code remains the same]
