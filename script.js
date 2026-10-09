const taskInput = document.getElementById("taskInput");
const addBtn = document.getElementById("addBtn");
const taskList = document.getElementById("taskList");
const taskCount = document.getElementById("taskCount");
const clearAllBtn = document.getElementById("clearAllBtn");

let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

function saveAndRender() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
  renderTasks();
}

function renderTasks() {
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.className = `list-group-item d-flex justify-content-between align-items-center border-0 task-item ${
      task.completed ? "completed" : ""
    }`;

    li.innerHTML = `
      <div class="d-flex align-items-center gap-2 flex-grow-1" style="cursor: pointer;" onclick="toggleTask(${index})">
        <i class="bi ${task.completed ? "bi-check-circle-fill text-success" : "bi-circle text-secondary"} fs-5"></i>
        <span class="fw-medium">${task.text}</span>
      </div>
      <button class="btn btn-sm btn-outline-danger border-0 delete-btn" onclick="deleteTask(${index})">
        <i class="bi bi-trash3"></i>
      </button>
    `;

    taskList.appendChild(li);
  });

  const pending = tasks.filter((t) => !t.completed).length;
  taskCount.textContent = `${pending} task${pending === 1 ? "" : "s"} pending`;
}

function addTask() {
  const text = taskInput.value.trim();
  if (text === "") {
    alert("Please enter a task name!");
    return;
  }
  tasks.push({ text: text, completed: false });
  taskInput.value = "";
  saveAndRender();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveAndRender();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveAndRender();
}

clearAllBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.completed);
  saveAndRender();
});

addBtn.addEventListener("click", addTask);

taskInput.addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

renderTasks();