'use strict';

// Global Variables of Elements Needed
var applyTask = document.getElementById('addNewTask_Form');
var taskCategory = document.getElementById('taskCategory');
var timeDropdown = document.getElementById('daytimeSelected');
var dropDownSection = document.getElementById('timeOfDay_Dropdown');
var headerName = document.getElementById('headerWelcome');

// Apply Users Name to the Header
headerName.textContent = `${mainUsersArr[cIdx].userName}'s Week`;

// Render Planner
function renderPlanner(){
  for(var i = 0; i < mainUsersArr[cIdx].Planner.length; i++){
    appendTask(mainUsersArr[cIdx].Planner[i].day,
      mainUsersArr[cIdx].Planner[i].category,
      mainUsersArr[cIdx].Planner[i].task,
      mainUsersArr[cIdx].Planner[i].time);
  }
}

//EVENT: Apply li to the Weekly Planner based on Days checked
// - the time of day selected will place in the corresponding ul
// - adds the task name to the li
// - gives the li an ID of: '[Category]Task' - for styling
// - Create the new taskbyDay and save to local storage
// - reset the form
//*********************************************************** */
applyTask.addEventListener('submit', findDaysApplied);

function findDaysApplied(e){
  e.preventDefault();
  var category = e.target.taskCategory.value;
  var timeOfDay = e.target.daytimeSelected.value;
  var taskEntered = e.target.taskEntered.value;

  findExistingTask(taskEntered, category);

  for(var x = 1; x <= 7; x++){

    var dayChecked = document.getElementById(`day${x}_chkbx`);

    if (dayChecked.checked){
      new TaskByDay(`day${x}`, category, taskEntered, timeOfDay);
      mainUsersArr[cIdx].Planner.push(userPlanner[userPlanner.length-1]);
      appendTask(`day${x}`,category, taskEntered, timeOfDay);
    }
  }
  console.log(mainUsersArr[cIdx].Exercise);
  toLocalStorage();
  applyTask.reset();
  dropDownSection.style.display = 'none';
}

function appendTask(day, category, task, time){
  var postSection  = document.getElementById(`${day}_${time}`);
  var taskItem = document.createElement('li');
  taskItem.textContent = `${category}: ${task}`;
  taskItem.id = `${category}Task`;
  postSection.appendChild(taskItem);
}

//https://www.w3schools.com/howto/howto_js_todolist.asp
//http://archive.oreilly.com/oreillyschool/courses/javascript2/DeletingTodoListItems.html

//EVENT: Show/Hide Time of Day Dropdown Menu
// - This event will also populate the dropdown
// - based off the Category selected.  This gives the
// - option for the Meals to be different.
// - Checkbox value is still the same to coincide with the planner lists
//*********************************************************** */
taskCategory.addEventListener('change', dayDropdownList);

function dayDropdownList(e){
  e.preventDefault();
  var cat = taskCategory.value;
  var mealArr = ['Breakfast','Lunch','Dinner'];
  var valueArr = ['morning','afternoon','evening'];

  while(timeDropdown.childElementCount > 0) {
    timeDropdown.removeChild(timeDropdown.lastElementChild);
  }

  if(cat === 'Meals'){
    dropDownSection.style.display = 'inline-flex';
    for(var i = 0; i<mealArr.length; i++){
      var selection = document.createElement('option');
      selection.textContent = mealArr[i];
      selection.value = valueArr[i];
      timeDropdown.appendChild(selection);
    }
  } else if (cat === ''){
    dropDownSection.style.display = 'none';
    while(timeDropdown.childElementCount > 0) {
      timeDropdown.removeChild(timeDropdown.lastElementChild);
    }
  }else {
    dropDownSection.style.display = 'inline-flex';
    for(var j = 0; j<valueArr.length; j++){
      selection = document.createElement('option');
      selection.textContent = valueArr[j];
      selection.value = valueArr[j];
      timeDropdown.appendChild(selection);
    }
  }
}

// CATEORIES: Exercise, Meals, ToDo, Activity
// function to find if task exists.
function findExistingTask(task, category){
  var taskExists = false;
  console.log(category);
  // Looks at the Exercise Category & Array
  if (category === 'Exercise'){
    for(var i = 0; i< mainUsersArr[cIdx].Exercise.length; i++){
      if(mainUsersArr[cIdx].Exercise[i].title === task){
        console.log('task exists');
        taskExists = true;
      }
    }
    if(!taskExists){
      new Exercise(task);
      mainUsersArr[cIdx].Exercise.push(userExercise[userExercise.length-1]);
    }
  }
  // Looks at the Meals Category & Array
  if (category === 'Meals'){
    for(i = 0; i< mainUsersArr[cIdx].Meals.length; i++){
      if(mainUsersArr[cIdx].Meals[i].title === task){
        taskExists = true;
      }
    }
    if(!taskExists){
      new Meals(task);
      mainUsersArr[cIdx].Meals.push(userMeals[userMeals.length-1]);
    }
  }
  // Looks at the ToDo Category & Array
  if (category === 'ToDo'){
    for(i = 0; i< mainUsersArr[cIdx].ToDo.length; i++){
      if(mainUsersArr[cIdx].ToDo[i].title === task){
        taskExists = true;
      }
    }
    if(!taskExists){
      new ToDo(task);
      mainUsersArr[cIdx].ToDo.push(userToDo[userToDo.length-1]);

    }
  }
}

// Pie chart information

var userEx = 0;
var userM = 0;
var userTdo =0;
var userAct = 0;
var total = mainUsersArr[cIdx].Planner.length;

function chartGen() {

  for(var i = 0; i < mainUsersArr[cIdx].Planner.length; i++){
    var lookupCat = mainUsersArr[cIdx].Planner[i].category;
    if(lookupCat === 'Meals'){userM ++;}
    if(lookupCat === 'Exercise'){userEx ++;}
    if(lookupCat === 'Activity'){userAct ++;}
    if(lookupCat === 'ToDo'){userTdo ++;}
    // userEx.push(mainUsersArr[i].userExercise);
    // userM.push(mainUsersArr[i].userMeals);
    // userTdo.push(mainUsersArr[i].userToDo);
  }

  var pMeal = Math.round ((userM/total) * 100);
  var pUserEx = Math.round ((userEx/total) * 100);
  var pUserTdo = Math.round ((userTdo/total) * 100);
  var pUserAct = Math.round((userAct/total) * 100);
  console.log(pMeal);
  console.log(pUserEx);
  console.log(pUserTdo);
  console.log(pUserAct);
  console.log(userEx);
  console.log(userM);
  console.log(userTdo);
  console.log(userAct);

  var ctx = document.getElementById('myChart').getContext('2d');

  new Chart(ctx, {
    type: 'pie',
    data: {
      labels: [
        'Exercise',
        'Meals',
        'ToDo',
        'Activities'
      ],
      datasets: [{
        data: [pUserEx, pUserEx, pUserTdo, pUserAct],
        backgroundColor: ['#91ee91', '#add8e6', '#ffb6c1', '#e6e6fa'],
        borderWidth: 0.5 ,
        borderColor: '#ddd'
      }],
    },
    options: {
      title: {
        display: true,
        text: '',
        position: 'top',
        fontSize: 16,
        fontColor: '#111',
        padding: 20
      },
      legend: {
        display: true,
        position: 'bottom',
        labels: {
          boxWidth: 20,
          fontColor: '#111',
          padding: 15
        }
      },
      tooltips: {
        enabled: false
      },
      plugins: {
        datalabels: {
          color: '#111',
          textAlign: 'center',
          font: {
            lineHeight: 1.6
          },
          formatter: function(value, ctx) {
            return ctx.chart.data.labels[ctx.dataIndex] + '\n' + value + '%';
          }
        }
      }
    }
  });
  // Pie chart label colors
  // [
  //   'Exercise',
  //   'Meals',
  //   'ToDo',
  //   'Activities'
  // ];
}



chartGen();
renderPlanner();
// Cassy's testing code below
//*******************************
//https://stackoverflow.com/questions/17788510/open-page-on-double-clicking-a-list-item
//https://stackoverflow.com/questions/19655189/javascript-click-event-listener-on-class

var plannerSection = document.getElementById('weeklyDisplaySection');

plannerSection.addEventListener('dblclick', goToDetail,false);

function goToDetail(e) {
  var elID = e.target.id;
  var cat = elID.slice(0,elID.length-4);
  var itemTitle = e.target.textContent.slice(cat.length+2, e.target.textContent.length);
  var detailItem = [];
  detailItem.push(cat);
  detailItem.push(itemTitle);
  localStorage.setItem('detailItem',JSON.stringify(detailItem));
  if(cat !== 'Activity'){window.location.href = 'detailPage.html';}
}

var plannerSection = document.getElementById('weeklyDisplaySection');