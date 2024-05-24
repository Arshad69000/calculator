let colorIndex = 0;
const colors = [
    '#87CEFA', '#FFB6C1', '#FFD700', '#ADFF2F', '#FF69B4',
    '#8A2BE2', '#00CED1', '#FF4500', '#7FFF00', '#DC143C'
];
const buttonColors = [
    '#89a9d7', '#ff94c8', '#ffeb73', '#c9ff73', '#ff94c8',
    '#b479eb', '#4edfe0', '#ff8266', '#a8ff66', '#e3667a'
];

const themeNames = [
    'Sky Blue', 'Light Pink', 'Gold', 'Green Yellow', 'Hot Pink',
    'Blue Violet', 'Dark Turquoise', 'Orange Red', 'Chartreuse', 'Crimson'
];

let calculationComplete = false;

function appendToResult(value) {
    const resultInput = document.getElementById('result');
    if (calculationComplete) {
        resultInput.value = '';
        calculationComplete = false;
    }
    resultInput.value += value;
}

function clearResult() {
    document.getElementById('result').value = '';
}

function backspace() {
    const resultInput = document.getElementById('result');
    if (!calculationComplete) {
        resultInput.value = resultInput.value.slice(0, -1);
    }
}

function calculateResult() {
    let result = document.getElementById('result').value;
    try {
        // Check for invalid characters
        if (/[^0-9+\-*/.%() ]/.test(result)) {
            throw new Error('Invalid characters');
        }

        // Check for division by zero
        if (result.includes('/0')) {
            throw new Error('Division by zero');
        }

        // Check for invalid syntax (operators at the end, consecutive operators, etc.)
        if (/[^+\-*/%]$/.test(result)) {
            throw new Error('Missing value');
        }
        if (/[\+\-*/%]{2,}/.test(result)) {
            throw new Error('Consecutive operators');
        }

        // Evaluate the result
        let evaluation = eval(result);
        if (!isFinite(evaluation)) {
            throw new Error('Invalid calculation');
        }
        document.getElementById('result').value = evaluation;
        calculationComplete = true;
    } catch (e) {
        document.getElementById('result').value = e.message;
        calculationComplete = true;
    }
}

function toggleThemeButtons() {
    const themeButtonsContainer = document.getElementById('theme-buttons');
    if (themeButtonsContainer.style.display === 'none' || !themeButtonsContainer.style.display) {
        themeButtonsContainer.innerHTML = '';
        themeNames.forEach((themeName, index) => {
            const themeButton = document.createElement('button');
            themeButton.innerText = themeName;
            themeButton.style.backgroundColor = colors[index];
            themeButton.className = 'theme-button';
            themeButton.onclick = () => changeTheme(index);
            themeButtonsContainer.appendChild(themeButton);
        });
        themeButtonsContainer.style.display = 'flex';
        document.addEventListener('click', handleOutsideClick);
    } else {
        themeButtonsContainer.style.display = 'none';
        document.removeEventListener('click', handleOutsideClick);
    }
}

function changeTheme(index) {
    const calculator = document.getElementById('calculator');
    const buttons = document.querySelectorAll('.buttons button');
    calculator.style.backgroundColor = colors[index];
    buttons.forEach(button => button.style.backgroundColor = buttonColors[index]);
    document.getElementById('theme-buttons').style.display = 'none';
    document.removeEventListener('click', handleOutsideClick);
}

function handleOutsideClick(event) {
    const themeButtonsContainer = document.getElementById('theme-buttons');
    const changeBgButton = document.querySelector('.change-bg');
    if (!themeButtonsContainer.contains(event.target) && event.target !== changeBgButton) {
        themeButtonsContainer.style.display = 'none';
        document.removeEventListener('click', handleOutsideClick);
    }
}

function changeBackground() {
    toggleThemeButtons();
}
