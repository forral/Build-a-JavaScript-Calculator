var input = document.querySelector('input');
var keyboard = document.querySelectorAll('.keyboard button');

input.value = '0';
input.select();

var operation = [];

function clickHandles(e) {

  if (this.dataset.value === 'AC') {
    input.value = '0';
    input.select();
    operation = [];
    console.dir(input);
    
  } else if (this.dataset.value === '=') {
    operation.push(input.value);
    input.value = (eval(operation.join(' ')));
    operation = [];
  
  } else if (window.getSelection().toString() === '0') {
    input.value = this.dataset.value;
    
  } else {
    input.value = input.value + this.dataset.value;
  }
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});