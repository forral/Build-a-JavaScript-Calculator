var screen = document.querySelector('.screen');
var keyboard = document.querySelectorAll('.keyboard button');

// Init.
screen.textContent = '0';
var operation = [];

var currentValue = '';
var currentOperation = '';

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
    } else {
      // show the clicked button value into the .screen.
      screen.textContent += this.dataset.value;
    }
  }

  // ------> MATH OPERATION
  if (this.dataset.type === 'mathOperation') {
    if (currentOperation) {
      currentOperation = this.dataset.value;

    } else {
      currentValue = screen.textContent;
      currentOperation = this.dataset.value;

      operation.push(currentValue);
      currentValue = '';
    }
  }

  // ------> RESULT
  if (this.dataset.value === '=') {    
    currentValue = screen.textContent;

    operation.push(currentValue);
    currentValue = '';
    currentOperation = '';

    var result = (eval(operation.join(' ')));

    // limit the characters on screen.
    if (result.length > 18) {
      result = result.toExponential();
    }

    screen.textContent = result;
    currentValue = screen.textContent;
    operation = [];
  }

  // ------> AC
  if (this.dataset.value === 'AC') {
    screen.textContent = '0';
    operation = [];
    currentValue = '';
    currentOperation = '';
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
    }
  }
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});