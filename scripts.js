var screen = document.querySelector('.screen');
var keyboard = document.querySelectorAll('.keyboard button');

// Init.
screen.textContent = '0';
var operation = [];

var currentValue = '';
var currentOperation = '';

function clickHandles(e) {

  if (this.dataset.type === 'mathOperation') {
    currentValue = screen.textContent;
    currentOperation = this.dataset.value;
  }

  // if (currentValue !== undefined && this.data.type === 'number') {

  // }

  // // If the button pushed is AC, then put the 0 value into the .screen and clean the operation array.
  // // **TODO**: turn into a function.
  // if (this.dataset.value === 'AC') {
  //   screen.textContent = '0';
  //   operation = [];
  //   currentValue = '';
  //   currentOperation = '';
    
  // // If the button pushed is =, then push the current value in the .screen into the operation array, 
  // //calculate it with eval() and show the result on the .screen.
  // // **TODO**: turn into a function.
  // } else if (this.dataset.value === '=') {
  //   operation.push(screen.textContent);
  //   screen.textContent = (eval(operation.join(' ')));
  //   operation = [];
  
  // // If the screen value it's 0 and the button pressed it's '.' the append it to the current value.
  // } else if (screen.textContent === '0' && this.dataset.value === '.') {
  //   screen.textContent += this.dataset.value;

  // // If the current value in the .screen it's a 0, then clean it and insert the current pushed button value.
  // } else if (screen.textContent === '0') {
  //   screen.textContent = this.dataset.value;
  
  // } else if (this.dataset.value === '+') {
    
  //   if (currentOperation === undefined && currentValue === undefined) {
  //     currentValue = screen.textContent;
  //     currentOperation = this.dataset.value;

  //     operation.push(currentValue);
  //     operation.push(currentOperation);
     
  //   }


  // }
  
  // // show the button pressed value into the .screen.
  // else {
  //   screen.textContent += this.dataset.value;
  // }

}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});