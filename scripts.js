var input = document.querySelector('input');
var keyboard = document.querySelectorAll('.keyboard button');

// Init.
// Giving the input the default value of 0 and highlight it.
input.value = '0';
input.select();

var operation = [];

function clickHandles(e) {

  // If the button pushed is AC, then put the 0 value into the input, highlight it and clean the operation array
  // **TODO**: turn into a function.
  if (this.dataset.value === 'AC') {
    input.value = '0';
    input.select();
    operation = [];
    console.dir(input);
    
  // If the button pushed is =, then push the current value in the input into the operation array, 
  //calculate it with eval() and show the result on the input.
  // **TODO**: turn into a function.
  } else if (this.dataset.value === '=') {
    operation.push(input.value);
    input.value = (eval(operation.join(' ')));
    operation = [];
  
  // If the current select text in the input it's a 0, then clean it and insert the current pushed button value.
  } else if (window.getSelection().toString() === '0') {
    input.value = this.dataset.value;

  // show the button pressed value into the input.
  } else {
    input.value = input.value + this.dataset.value;
  }
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});