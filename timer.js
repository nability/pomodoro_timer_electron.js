let totalSeconds = 25 * 60; // 25 menit
let timer = null;
let isRunning = false;

const timerDisplay = document.getElementById("timer");
const startBtn = document.getElementById("startBtn");
const stopBtn = document.getElementById("stopBtn");

function updateDisplay() {
  const minutes = Math.floor(totalSeconds / 60);
  const seconds = totalSeconds % 60;
  timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
}

function startTimer() {
  if (isRunning) return;
  isRunning = true;

  timer = setInterval(() => {
    if (totalSeconds > 0) {
      totalSeconds--;
      updateDisplay();
    } else {
      clearInterval(timer);
      isRunning = false;
      alert("Waktu Habis! Saatnya istirahat.");
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(timer);
  isRunning = false;
}

startBtn.addEventListener("click", startTimer);
stopBtn.addEventListener("click", stopTimer);

// Set awal
updateDisplay();

const todoInput = document.getElementById("todoInput");
const addTodoBtn = document.getElementById("addTodoBtn");
const todoList = document.getElementById("todoList");

function loadTodos() {
  const todos = JSON.parse(localStorage.getItem("todos")) || [];
  todos.forEach(todo => addTodoElement(todo.text, todo.completed));
}

function addTodoElement(text, completed = false) {
  const li = document.createElement("li");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.checked = completed;
  checkbox.addEventListener("change", saveTodos);

  const span = document.createElement("span");
  span.textContent = text;
  if (completed) span.style.textDecoration = "line-through";

  checkbox.addEventListener("change", () => {
    span.style.textDecoration = checkbox.checked ? "line-through" : "none";
    saveTodos();
  });

  li.appendChild(checkbox);
  li.appendChild(span);
  todoList.appendChild(li);
}

function saveTodos() {
  const todos = [];
  todoList.querySelectorAll("li").forEach(li => {
    const text = li.querySelector("span").textContent;
    const completed = li.querySelector("input").checked;
    todos.push({ text, completed });
  });
  localStorage.setItem("todos", JSON.stringify(todos));
}

addTodoBtn.addEventListener("click", () => {
  const text = todoInput.value.trim();
  if (text !== "") {
    addTodoElement(text);
    saveTodos();
    todoInput.value = "";
  }
});

// Load saat halaman dibuka
loadTodos();
