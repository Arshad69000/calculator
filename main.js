let colorIndex = 0;
const colors = [
    '#87CEFA', '#FFB6C1', '#FFD700', '#ADFF2F', '#FF69B4',
    '#8A2BE2', '#00CED1', '#FF4500', '#7FFF00', '#DC143C'
];
const buttonColors = [
    '#4682B4', '#FF69B4', '#FFD700', '#ADFF2F', '#FF69B4',
    '#8A2BE2', '#00CED1', '#FF4500', '#7FFF00', '#DC143C'
];

function appendToResult(value) {
    document.getElementById('result').value += value;
}

function clearResult() {
    document.getElementById('result').value = '';
}

function backspace() {
    let result = document.getElementById('result').value;
    document.getElementById('result').value = result.slice(0, -1);
}

function calculateResult() {
    let result = document.getElementById('result').value;
    try {
        document.getElementById('result').value = eval(result);
    } catch (e) {
        document.getElementById('result').value = 'Error';
    }
}

function changeBackground() {
    let calculator = document.getElementById('calculator');
    let buttons = document.querySelectorAll('.buttons button');
    colorIndex = (colorIndex + 1) % colors.length;
    calculator.style.backgroundColor = colors[colorIndex];
    buttons.forEach(button => button.style.backgroundColor = buttonColors[colorIndex]);
}