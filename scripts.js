var screen = document.querySelector('.screen');
var keyboard = document.querySelectorAll('.keyboard button');
keyboard = [...keyboard];

screen.textContent = '0';
var operation = [];
var currentValue = '';
var currentOperation = '';
var lastOp = [];

function clickHandle(e) {
  if (this.dataset.type === 'number') {
    numberSelected(this.dataset.value);
  }

  if (this.dataset.type === 'mathOperation') {
    mathOperationSelected(this.dataset.value);
  }

  if (this.dataset.value === '=') {
    getResult();
  }

  if (this.dataset.value === 'AC') {
    allClear();
  }

  if (this.dataset.value === 'CE') {
    clearEntry();
  }
}

function keyPressedHandle(e) {
  // AC
  if (e.keyCode === 27) {
    allClear();
  }

  // Number (48 - 57 and .)
  if ((e.keyCode > 48 && e.keyCode < 58) || e.keyCode === 190) {
    numberSelected(e.key);
  }

  // Math Operation (/ 220, * 187, + -)
  var mathSymbols = ['+', '/', '*', '-'];
  if (mathSymbols.includes(e.key)) {
    mathOperationSelected(e.key);
  }

  // Result Operation (=)
  if (e.key === '=' || e.keyCode === 13) {
    e.preventDefault();
    getResult();
  }
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandle);
});

document.addEventListener('keyup', keyPressedHandle);

function allClear() {
  screen.textContent = '0';
  operation = [];
  currentValue = '';
  currentOperation = '';
  cleanHighlightButton();
  lastOp = [];
}

// TODO: not sure about the naming of this function
function mathOperationSelected(selection) {
  if (currentOperation) {
    cleanHighlightButton();
    currentOperation = selection;
    addHighlightButton(selection);

  } else {
    currentValue = screen.textContent;
    cleanHighlightButton();
    currentOperation = selection;
    addHighlightButton(selection);
    operation.push(currentValue);
    currentValue = '';
  }
}

function cleanHighlightButton() {
  keyboard.forEach((button) => button.classList.remove('selected'));
}

function addHighlightButton(selection) {
  var currentButton = keyboard.find(function (button) {
    return button.dataset.value === selection;
  });
  currentButton.classList.add('selected');
}

function getResult() {
  if (operation.length === 1 && currentOperation) {
    operation.unshift(0, currentOperation);
  } else {
    currentValue = screen.textContent;
  }

  if (operation.length === 0 && lastOp) {
    operation.push(currentValue);
    operation = operation.concat(lastOp);
  } else if (currentValue !== '') {
    operation.push(currentValue);
  }

  currentValue = '';
  currentOperation = '';

  var result = (eval(operation.join(' ')));

  // limit the result characters on screen.
  // (result + '') it´s for converting the result into an string 
  if ((result + '').length > 18) {
    // result = result.toExponential();
    digitLimitMet()
  } else {
    screen.textContent = result;
    currentValue = screen.textContent;
  }

  if (operation[operation.length - 2]) {
    lastOp = [];
    lastOp.push(operation[operation.length - 2]);
    lastOp.push(operation[operation.length - 1]);
  } else {
    lastOp = [];
  }

  cleanHighlightButton();
  operation = [];
}

function clearEntry() {
  if (currentValue === '' && currentOperation === '') {
    if (screen.textContent === '0') {
      operation.pop();
    } else {
      screen.textContent = '0';
    }
  }

  if (operation.length > 0 && currentOperation !== '') {
    currentOperation = '';
    operation.pop();
    cleanHighlightButton();
  }

  if (currentValue !== '' && screen.textContent !== '0') {
    currentValue = '';
    screen.textContent = '0';
    cleanHighlightButton();
  }
}

function numberSelected(selection) {
  if (currentOperation) {
    operation.push(currentOperation);
    currentOperation = '';
    screen.textContent = '';
  }

  if (screen.textContent === '0') {
    if (selection === '.') {
      // If the screen value it's 0 and the button pressed it's '.' the append it to the current value.
      screen.textContent += selection;
    } else {
      // If the current value in the ´.screen´ it's a 0, then clean it and insert the current pushed button value.
      screen.textContent = selection;
    }
  } else if (selection === '.') {
    if (screen.textContent.indexOf('.') > 0) {
      // If there is allready a point in the screen, don't let show more.
      screen.textContent = screen.textContent;
    }
    else if (screen.textContent === '') {
      // If the screen don't have any value and the button click is a point, then put an 0 before it.
      screen.textContent = '0' + selection;
    } else {
      screen.textContent += selection;
    }
  } else if (screen.textContent === currentValue) {
    // If the screen has the result of an operation and the next button clickes it´s a number,
    // then clean the screen and had the value of the clicked button.
    screen.textContent = selection;
  } else if (screen.textContent.length > 18) {
    // if the screen number it's bigger than 18 characteres, use Exponetial
    // TODO: i'm not happy with this solution, see how google calculator deals with this situation.
    // screen.textContent = Number(screen.textContent).toExponential();
    digitLimitMet()
  } else {
    // show the clicked button value into the .screen.
    screen.textContent += selection;
  }
}

function digitLimitMet() {
  screen.textContent = 'DIGIT LIMIT MET';
  operation = [];
  currentOperation = '';
  currentValue = '';
  lastOp = [];
}