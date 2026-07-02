const STORAGE_KEY = "jenkins-lab-todos";

const form = document.getElementById("todoForm");
const input = document.getElementById("todoInput");
const list = document.getElementById("todoList");
const count = document.getElementById("todoCount");
const clearDoneBtn = document.getElementById("clearDone");
const envBadge = document.getElementById("envBadge");

let todos = loadTodos();

function loadTodos() {
  try {
    return JSON.parse(localStorage.getItem(STORAGE_KEY)) || [];
  } catch {
    return [];
  }
}

function saveTodos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(todos));
}

function render() {
  list.innerHTML = "";
  todos.forEach((todo) => {
    const li = document.createElement("li");
    li.className = "todo-item" + (todo.done ? " done" : "");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = todo.done;
    checkbox.addEventListener("change", () => {
      todo.done = checkbox.checked;
      saveTodos();
      render();
    });

    const span = document.createElement("span");
    span.textContent = todo.text;

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Supprimer";
    deleteBtn.addEventListener("click", () => {
      todos = todos.filter((t) => t.id !== todo.id);
      saveTodos();
      render();
    });

    li.append(checkbox, span, deleteBtn);
    list.appendChild(li);
  });

  count.textContent = `${todos.length} tâche(s)`;
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;

  todos.push({ id: Date.now(), text, done: false });
  saveTodos();
  render();
  input.value = "";
});

clearDoneBtn.addEventListener("click", () => {
  todos = todos.filter((t) => !t.done);
  saveTodos();
  render();
});

async function loadEnvBadge() {
  try {
    const res = await fetch("/api/config");
    const data = await res.json();
    envBadge.textContent = `ENV: ${data.appEnv} — ${data.appName}`;
  } catch {
    envBadge.textContent = "ENV: serveur non lancé";
  }
}

render();
loadEnvBadge();
