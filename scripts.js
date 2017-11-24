function add(a, b) {
  return a + b;
}

function subtract(a, b) {
  return a - b;
}

function multiply(a, b) {
  return a * b;
}

function divide(a, b) {
  return a / b;
}

function clear(element) {
  element.value = 0;
  input.select();
}

var input = document.querySelector('input');
input.value = 0;
input.focus();
input.select();

input.addEventListener('keydown', function() {
  if (this.value === 0) {
    this.valus = '';
  }
});

input.addEventListener('keyup', function(e) {
  if (this.value === '' || e.keyCode === 27) {
    clear(this);
  }
});