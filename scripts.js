var input = document.querySelector('input');
var keyboard = document.querySelectorAll('.keyboard button');

var operation = [];

function clickHandles(e) {

  if (this.dataset.value === 'AC') {
    input.value = '';
    operation = [];

  } else if (this.dataset.value === '=') {
    operation.push(input.value);
    input.value = (eval(operation.join(' ')));
    operation = [];
    
  } else {
    input.value = input.value + this.dataset.value;
  }
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});