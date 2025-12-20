let items = [
	"Сделать проектную работу",
	"Полить цветы",
	"Пройти туториал по Реакту",
	"Сделать фронт для своего проекта",
	"Прогуляться по улице в солнечный день",
	"Помыть посуду",
];

const listElement = document.querySelector(".to-do__list");
const formElement = document.querySelector(".to-do__form");
const inputElement = document.querySelector(".to-do__input");


// funcs != funs :/

function loadTasks() {
  let currTasks = localStorage.getItem('tasks');
  if (currTasks) {
    return JSON.parse(currTasks);
  }
  return items;
}

function createItem(item) {
	const template = document.getElementById("to-do__item-template");
	const clone = template.content.querySelector(".to-do__item").cloneNode(true);
  	const textElement = clone.querySelector(".to-do__item-text");
  	const deleteButton = clone.querySelector(".to-do__item-button_type_delete");
  	const duplicateButton = clone.querySelector(".to-do__item-button_type_duplicate");
  	const editButton = clone.querySelector(".to-do__item-button_type_edit");

	textElement.textContent = item;

	// adding functional to the new tasks' BUTTons
	deleteButton.addEventListener('click', function () {
		clone.remove();
		items = getTasksFromDOM();
		saveTasks(items);
	});

	duplicateButton.addEventListener('click', function () {
		listElement.prepend(createItem(textElement.textContent)); //recursions are fun (nope)
		items = getTasksFromDOM();
		saveTasks(items);
	});

	editButton.addEventListener('click', function () {
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});

	textElement.addEventListener('blur', function () { 
		// blur = lose focus of element. This way we update the value of element in DOM
		textElement.setAttribute('contenteditable', 'false');
		items = getTasksFromDOM();
		saveTasks(items);
	});

	textElement.addEventListener('dblclick', function () { 
		// just to add fun for double click)))
		textElement.setAttribute('contenteditable', 'true');
		textElement.focus();
	});

	textElement.addEventListener('keydown', function (event) {
		if (event.key == 'Enter'){
			event.preventDefault();
			textElement.blur();
		}
	});

	return clone;
}

function getTasksFromDOM() {
	let textListAllElem = []
	listElement.querySelectorAll('.to-do__item-text').forEach(function (item) {
		textListAllElem.push(item.textContent);
	})
	return textListAllElem;
}

function saveTasks(tasks) {
	localStorage.setItem('tasks', JSON.stringify(tasks));
}



// event listeners. At least those, that can be here

formElement.addEventListener('submit', function (event) {
	event.preventDefault();

	let inputText = inputElement.value;

	if (inputText) {
		listElement.prepend(createItem(inputText));
		items = getTasksFromDOM();
		saveTasks(items);
		inputElement.value = '';
	}
})



// procedural programming begins here... you will continue your way without me, Frodo...

items = loadTasks();
items.forEach(function (item) {
	let newItem = createItem(item);
	listElement.append(newItem);
})