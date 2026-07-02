// test/test.js
// Test volontairement simple et sans framework externe,
// pour que les étudiants comprennent chaque ligne facilement.
// Objectif pédagogique : avoir une stage "Test" dans Jenkins qui
// échoue vraiment si le code est cassé.

require("dotenv").config();

function assert(condition, message) {
  if (!condition) {
    console.error(`FAIL: ${message}`);
    process.exitCode = 1;
  } else {
    console.log(`PASS: ${message}`);
  }
}

// Vérifie que les variables essentielles du .env existent
assert(typeof process.env.APP_NAME === "string" && process.env.APP_NAME.length > 0,
  "APP_NAME doit être défini dans .env");

assert(!!process.env.APP_ENV, "APP_ENV doit être défini dans .env");

const port = Number(process.env.PORT);
assert(Number.isInteger(port) && port > 0, "PORT doit être un entier positif");

// Petit test "métier" basique
function addTodo(list, text) {
  return [...list, { id: Date.now(), text, done: false }];
}

const todos = addTodo([], "Apprendre Jenkins");
assert(todos.length === 1, "addTodo doit ajouter un élément à la liste");
assert(todos[0].text === "Apprendre Jenkins", "le texte de la tâche doit être conservé");

if (process.exitCode === 1) {
  console.error("\nDes tests ont échoué.");
} else {
  console.log("\nTous les tests sont passés.");
}
