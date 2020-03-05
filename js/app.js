'use strict';

var userMeals = [];
var userExercise = [];
var userToDo = [];
var mainUsersArr = [];
var userPlanner = [];
var cIdx;



//constructor for user
function UserData(userName, userMeals=[], userExercise=[], userToDo=[], userPlanner=[]) {
  this.userName = userName;
  this.Meals = userMeals;
  this.Exercise = userExercise;
  this.ToDo = userToDo;
  this.Planner = userPlanner;
  mainUsersArr.push(this);
}
//constrcutor for user meals
function Meals(name) {
  this.title = name;
  this.ingredients = [];
  this.prepDirections = [];
  this.servings = '';
  this.prepTime = '';
  this.cookedTime = '';
  userMeals.push(this);
}
//constructor for users exercise
function Exercise(name) {
  this.title = name;
  this.duration = '';
  this.typeOfExcercise = '';
  this.reps = '';
  this.calsToBurn = '';
  userExercise.push(this);
}

//contructor for users to do list
function ToDo(name) {
  this.title = name;
  this.list = [];
  this.checked = [];
  userToDo.push(this);
}
//contructor for users set Planner
function TaskByDay (Day, category, Task, Time){
  this.day = Day;
  this.category = category;
  this.task = Task;
  this.time = Time;
  userPlanner.push(this);
}

//function to look for existing user name
function findUser(name) {
  var existingUser = false;
  for (var i = 0; i < mainUsersArr.length; i++) {
    if (name === mainUsersArr[i].userName) {
      existingUser = true;
      localStorage.setItem('CurrentUser', JSON.stringify(i));
      break;
    }
  } 
  if (existingUser === false) {
    new UserData(name);
    localStorage.setItem('CurrentUser', JSON.stringify(mainUsersArr.length -1)); 
  }
}

// Set Global variable of the Current user Index
cIdx = JSON.parse(localStorage.getItem('CurrentUser'));


function toLocalStorage(){
  var stringArr = JSON.stringify(mainUsersArr);
  localStorage.setItem('swMainUsers', stringArr);
}
function populateUsers(){
  if (localStorage.getItem('swMainUsers')) {
    var allStoredUsers = JSON.parse(localStorage.getItem('swMainUsers'));
    for (var i = 0; i < allStoredUsers.length; i++) {
      new UserData(allStoredUsers[i].userName, allStoredUsers[i].Meals, allStoredUsers[i].Exercise, allStoredUsers[i].ToDo, allStoredUsers[i].Planner);
    }
  } else {
    new Meals('pasta');
    new Meals('protein shake');
    new Exercise('crossfit');
    new Exercise('yoga');
    new UserData('Chuck', userMeals, userExercise);
    new UserData('Cassandra',[],userExercise);
    new UserData('Lesley', userMeals, userExercise);
    new UserData('Rich', userMeals, userExercise);
  }
}

function deleteUserFunction() {
  mainUsersArr.splice(cIdx, 1);
  toLocalStorage();
  window.location.href = 'index.html';
}

populateUsers();