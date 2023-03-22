let taskInput = document.querySelector(".task-input input");
let clearAll = document.querySelectorAll(".clear-btn")[0];
let clearCompleted = document.querySelectorAll(".clear-btn")[1];
let taskBox = document.querySelector(".task-box");
let filters = document.querySelectorAll(".filters span");
let bottomControls = document.querySelector(".bottom-controls");
let addBtn = document.querySelector(".add-btn");

// DECLARING VARIABLES OR INTIALIZING LOCAL STORAGE
let editId,
  isEditTask = false,
  todos = JSON.parse(localStorage.getItem("todo-list")) || [];

// FALL COMPLETE UNCOMPLETE) LOOP CLICK EVENT LISTENER
filters.forEach((btn) => {
  btn.addEventListener("click", () => {
    document.querySelector("span.active").classList.remove("active");
    btn.classList.add("active");
    showTodo();
  });
});

showTodo();

// SHOW TODO LIST FUNCTION
function showTodo() {
  let filter = document.querySelector(".filters .active").id;
  let liTag = "";
  let count = 0;
  // APPENDING LIST
  todos.forEach((todo, id) => {
    let completed = todo.status == "completed" ? "checked" : "";
    if (filter == todo.status || filter == "all") {
      count++;

      liTag += `<li class="task">
                            <label for="${id}">
                                <input onclick="updateStatus(this)" type="checkbox" id="${id}" ${completed}>
                                <span class="checkmark"></span>
                                <p class="${completed}">${todo.name} </p>
                                
                            </label>
                            <div class="settings">
                                <i onclick="showMenu(this)" class="uil uil-ellipsis-h"></i>
                                <ul class="task-menu">
 
 
                                   <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/circle-cross.png"
                                    onclick='deleteTask(${id})'>
                               </ul>
                              
                            </div>
                        </li>`;
    }
  });
  taskBox.innerHTML = liTag;
  document.querySelector(
    ".task-left"
  ).innerHTML = `<span class="bold">${count} </span>task${
    count > 1 ? "s" : ""
  } left`;
}

// UPDATING OR SORTING TODO LISTS
function updateStatus(selectedTask) {
  let taskName = selectedTask.parentElement.lastElementChild;
  if (selectedTask.checked) {
    taskName.classList.add("checked");
    todos[selectedTask.id].status = "completed";
  } else {
    taskName.classList.remove("checked");
    todos[selectedTask.id].status = "pending";
  }
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

// DELETE EACH ELEMENT FROM TODO ARRAYS ON CLICK
function deleteTask(id) {
  todos.splice(id, 1);
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
}

// CLEAR-BTN EVENT-LISTENER
clearAll.addEventListener("click", () => {
  isEditTask = false;
  todos.forEach((todo) => (todo.status = "completed"));

  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});
// CLEAR COMPLETED EVENT-LISTENER
clearCompleted.addEventListener("click", () => {
  isEditTask = false;
  todos = todos.filter((todo) => todo.status !== "completed");
  localStorage.setItem("todo-list", JSON.stringify(todos));
  showTodo();
});

//KEYBOARD EVENT LISTENER INPUT
taskInput.addEventListener("keyup", (e) => {
  let userTask = taskInput.value.trim();
  if (e.key == "Enter" && userTask) {
    if (!isEditTask) {
      todos = !todos ? [] : todos;
      let taskInfo = { name: userTask, status: "pending" };
      todos.push(taskInfo);
    } else {
      isEditTask = false;
      todos[editId].name = userTask;
    }
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo(document.querySelector("span.active").id);
  } else if (e.key == "Enter" && !userTask) {
    alert("You must write something!");
  }
});

// Add BUTTON EVENT LISTENER
addBtn.addEventListener("click", () => {
  let userTask = taskInput.value.trim();
  if (userTask) {
    let taskInfo = { name: userTask, status: "pending" };
    todos.push(taskInfo);
    taskInput.value = "";
    localStorage.setItem("todo-list", JSON.stringify(todos));
    showTodo();
  } else if (!userTask) {
    alert("You must write something!");
  }
});
