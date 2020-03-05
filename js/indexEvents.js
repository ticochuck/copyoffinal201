'use strict';

//Event to get user name from input
var userNameEvent = document.getElementById('formUserName');
userNameEvent.addEventListener('submit', handleSubmit);

function handleSubmit(e) {
  e.preventDefault();
  var newUser = e.target.userName.value;
  findUser(newUser);
  toLocalStorage();
  window.location.href = 'main.html';
}



