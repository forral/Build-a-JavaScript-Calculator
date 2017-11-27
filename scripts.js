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
var ESC   = 27;
var ENTER = 13;
var PLUS  = 187;
var MINUS = 189;

// Init
input.value = 0;
input.focus();
input.select();


var leftValue;
var rightValue;

input.addEventListener('keydown', function(e) {
  if (this.value === 0) {
    this.valus = '';
  }
});

input.addEventListener('keyup', function(e) {
  if (this.value === '' || e.keyCode === ESC) {
    clear(this);
  }

  if (e.keyCode === PLUS) {
    leftValue = parseInt(this.value.replace(/\D/, ''));
    console.log(leftValue);
  }
});

function example() {
  console.log(this);
}