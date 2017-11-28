var input = document.querySelector('input');
var keyboard = document.querySelectorAll('.keyboard button');

function clickHandles(e) {

  if (this.dataset.value === 'AC') {
    input.value = '';

  } else {
    input.value = input.value + this.dataset.value;
  }

  
}

keyboard.forEach(button => {
  button.addEventListener('click', clickHandles);
});