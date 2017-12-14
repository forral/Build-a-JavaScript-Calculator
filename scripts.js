var screen = document.querySelector('.screen');
var keyboard = document.querySelectorAll('.keyboard button');

// Init.
screen.textContent = '0';
var operation = [];
var currentValue = '';
var currentOperation = '';
var lastOp = [];

function clickHandles(e) {

  // ------> NUMBER
  if (this.dataset.type === 'number') {
    if (currentOperation) {
      operation.push(currentOperation);
      currentOperation = '';
      screen.textContent = '';
    }

    if (screen.textContent === '0') {
      if (this.dataset.value === '.') {
        // If the screen value it's 0 and the button pressed it's '.' the append it to the current value.
        screen.textContent += this.dataset.value;
      } else {
      // If the current value in the ´.screen´ it's a 0, then clean it and insert the current pushed button value.
      screen.textContent = this.dataset.value;
      }
    } else if (this.dataset.value === '.') {
      if (screen.textContent.indexOf('.') > 0) {
        // If there is allready a point in the screen, don't let show more.
        screen.textContent = screen.textContent;
      }
      if (screen.textContent === '') {
        // If the screen don't have any value and the button click is a point, then put an 0 before it.
        screen.textContent = '0' + this.dataset.value;
      }
    } else if (screen.textContent === currentValue) {
      // If the screen has the result of an operation and the next button clickes it´s a number,
      // then clean the screen and had the value of the clicked button.
      screen.textContent = this.dataset.value;
    } else if (screen.textContent.length > 18) {
      // if the screen number it's bigger than 18 characteres, use Exponetial
      // TODO: i'm not happy with this solution, see how google calendar deals with this situation.
      screen.textContent = Number(screen.textContent).toExponential();
    } else {
      // show the clicked button value into the .screen.
      screen.textContent += this.dataset.value;
    }
  }

  // ------> MATH OPERATION
  if (this.dataset.type === 'mathOperation') {
    if (currentOperation) {
      cleanHighlightButton();
      currentOperation = this.dataset.value;
      this.classList.add('selected');

    } else {
      currentValue = screen.textContent;
      cleanHighlightButton();
      currentOperation = this.dataset.value;
      this.classList.add('selected');

      operation.push(currentValue);
      currentValue = '';
    }
  }

  // ------> RESULT
  if (this.dataset.value === '=') {

    currentValue = screen.textContent;

    if (operation.length === 0 && lastOp) {
      operation.push(currentValue);
      operation = operation.concat(lastOp);
    } else {
      operation.push(currentValue);
    }

    currentValue = '';
    currentOperation = '';

    var result = (eval(operation.join(' ')));

    // limit the result characters on screen.
    if (result.toString().length > 18) {
      result = result.toExponential();
    }

    screen.textContent = result;
    currentValue = screen.textContent;

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

  // ------> AC
  if (this.dataset.value === 'AC') {
    allClear();
  }

  // ------> CE
  if (this.dataset.value === 'CE') {

    if (currentValue === '' && currentOperation === '') {
      if (screen.textContent === '0') {
        operation.pop();
      } else {
        screen.textContent = '0';
      }
    }

    if (operation.length > 0 && currentOperation !== '') {
      currentOperation = '';
      cleanHighlightButton();
    }

    if (currentValue !== '' && screen.textContent !== '0') {
      currentValue = '';
      screen.textContent = '0';
      cleanHighlightButton();
    }
  }
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});

function allClear() {
  screen.textContent = '0';
  operation = [];
  currentValue = '';
  currentOperation = '';
  cleanHighlightButton();
  lastOp = [];
}

function cleanHighlightButton() {
  keyboard.forEach((button) => button.classList.remove('selected'));
}