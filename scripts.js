var screen = document.querySelector('.screen');
var keyboard = document.querySelectorAll('.keyboard button');

// Init.
screen.textContent = '0';
var operation = [];

function clickHandles(e) {

  // If the button pushed is AC, then put the 0 value into the input, highlight it and clean the operation array
  // **TODO**: turn into a function.
  if (this.dataset.value === 'AC') {
    screen.textContent = '0';
    operation = [];
    
  // If the button pushed is =, then push the current value in the input into the operation array, 
  //calculate it with eval() and show the result on the input.
  // **TODO**: turn into a function.
  } else if (this.dataset.value === '=') {
    operation.push(screen.textContent);
    screen.textContent = (eval(operation.join(' ')));
    operation = [];
  
  // If the input selected value it's 0 and the button pressed it's '.' the append it to the current value.
  } else if (screen.textContent === '0' && this.dataset.value === '.') {
    screen.textContent += this.dataset.value;

  // If the current select text in the input it's a 0, then clean it and insert the current pushed button value.
  } else if (screen.textContent === '0') {
    screen.textContent = this.dataset.value;

  // show the button pressed value into the input.
  } else {
    screen.textContent += this.dataset.value;
  }
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});