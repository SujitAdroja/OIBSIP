const addTasks = document.querySelector(".btn-add-task");
const taskName = document.querySelector(".task-name");
const taskDescription = document.querySelector(".task-desc");
const taskContainer = document.querySelector(".task-container");
const btnRemove = document.querySelector(".btn-remove");
const clearTask = document.querySelector(".btn-clear");
const taskHeadingContainer = document.querySelector(".task-headings-container");
let tasks = [];
const monthNames = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

const addTaksInList = function () {
  const name = taskName.value;
  const description = taskDescription.value;
  if (!name) return;
  if (!description) return;
  const time = new Date();
  const date = `${time.getDate()}/${monthNames[time.getMonth()]}`;
  const hours = time.getHours();
  const minutes = time.getMinutes();
  if (name === " ") return;
  const markup = `
    <li
        class="list-group-item  "
      >
        <div class="task-title">${name}</div>
        <div class="task-description">${description}</div>
        <div class="task-date-close">
           
        <span class="date">Date : ${date}</span>
        <span class="time">Time : ${hours}:${minutes}</span>
        <button type="button" class="btn btn-remove">X</button>
        </div>
    </li>
      `;

  taskContainer.insertAdjacentHTML("beforeend", markup);
  taskName.value = " ";
  taskDescription.value = "";
  const task = {
    name,
    hours,
    minutes,
    date,
    description,
  };
  tasks.push(task);
  addToLocalStorage();
};

const removetasks = function (e) {
  console.log(e.target.parentElement.parentElement);
  if (e.target.classList.contains("btn-remove")) {
    if (confirm("Are you really sure . You Want to delete the task ??? ")) {
      removeFromLocalStorage(e.target.parentElement.parentElement);
      e.target.parentElement.parentElement.remove();
    }
  }
};

const clearAllTasks = function () {
  // taskContainer.innerHTML = "";
  while (taskContainer.firstChild) {
    taskContainer.removeChild(taskContainer.firstChild);
  }

  tasks = [];
  localStorage.clear();
};

const addToLocalStorage = function () {
  localStorage.clear();
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const removeFromLocalStorage = function (taskItem) {
  const itemValue = taskItem.querySelector(".task-title");
  console.log(itemValue);
  const items = JSON.parse(localStorage.getItem("tasks"));
  console.log(items);
  items.forEach((item, index) => {
    if (item.name === itemValue.textContent) tasks.splice(index, 1);
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
};

const loadTaks = function () {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  if (tasks === null) tasks = [];
  if (!tasks) return;
  taskHeadingContainer.classList.remove("hidden");
  const markup = tasks
    .map(
      (task) => `
      <li
      class="list-group-item  "
    >
      <div class="task-title">${task.name}</div>
      <div class="task-description">${task.description}</div>
      <div class="task-date-close">
         
      <span class="date">Date : ${task.date}</span>
      <span class="time">Time : ${task.hours}:${task.minutes}</span>
      <button type="button" class="btn btn-remove">X</button>
      </div>
  </li>
  `
    )
    .join("");
  taskContainer.insertAdjacentHTML("afterbegin", markup);
};

window.addEventListener("load", loadTaks);
addTasks.addEventListener("click", addTaksInList);
taskContainer.addEventListener("click", removetasks);
clearTask.addEventListener("click", clearAllTasks);
