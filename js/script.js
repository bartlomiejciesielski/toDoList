let TODO_INPUT; // Miejsce, gdzie użytkownik wpisuje treść
let ALERT_INFO; // Info o braku zadań / konieczności dodania tekstu
let ADD_BTN; // Przycisk ADD - dodaje nowe elementy do listy
let UL_LIST; // Nasza lista zadań, tagi <ul></ul>
let NEW_TASK; // Nowo dodany LI, nowe zadanie
let ALL_TASKS; // Lista wszystkich dodanych LI
let ID_NUMBER = 0; // ID dodawane do każdego nowego zadania
let POPUP; // Pobrany popup
let POPUP_INFO; // Alert w popupie, jak się doda pusty tekst
let EDITED_TODO; // Edytowany Todo
let POPUP_INPUT; // Tekst wpisywany w inputa w popup'ie
let ADD_POPUP_BTN; // Przycisk "zatwierdź" w popup'ie
let CLOSE_TODO_BTN; // Przycisk od zamykania popup'a
let EDITED_TODO_ID; // ID zadania do edycji

const main = () => {
	prepareDOMElements();
	prepareDOMEvents();
};

const prepareDOMElements = () => {
	TODO_INPUT = document.querySelector('.todo-input');
	ALERT_INFO = document.querySelector('.alert-info');
	ADD_BTN = document.querySelector('.add-btn');
	UL_LIST = document.querySelector('.todo-list ul');
	ALL_TASKS = document.getElementsByTagName('li');
	POPUP = document.querySelector('.popup');
	POPUP_INFO = document.querySelector('.popup-info');
	POPUP_INPUT = document.querySelector('.popup-input');
	ADD_POPUP_BTN = document.querySelector('.accept');
	CLOSE_TODO_BTN = document.querySelector('.cancel');
};

const prepareDOMEvents = () => {
	ADD_BTN.addEventListener('click', addNewTask);
	TODO_INPUT.addEventListener('keyup', enterCheck);
	UL_LIST.addEventListener('click', checkClick);
	ADD_POPUP_BTN.addEventListener('click', editTask);
	CLOSE_TODO_BTN.addEventListener('click', closePopup);
};

const addNewTask = () => {
	if (TODO_INPUT.value !== '') {
		ID_NUMBER++;
		NEW_TASK = document.createElement('li');
		NEW_TASK.innerText = TODO_INPUT.value;
		NEW_TASK.setAttribute('id', `todo-${ID_NUMBER}`);
		UL_LIST.appendChild(NEW_TASK);
		createToolsArea('new');
		TODO_INPUT.value = '';
		ALERT_INFO.innerText = '';
	} else {
		ALERT_INFO.innerText = 'Wpisz treść zadania!';
	}
};

const enterCheck = event => {
	if (event.key === 'Enter') {
		addNewTask();
	}
};

const createToolsArea = type => {
	// Tworzenie przycisków
	const completeBtn = document.createElement('button');
	completeBtn.classList.add('complete');
	completeBtn.innerHTML = '<i class="fas fa-check"></i>';

	const editBtn = document.createElement('button');
	editBtn.classList.add('edit');
	editBtn.innerText = 'EDYTUJ';

	const deleteBtn = document.createElement('button');
	deleteBtn.classList.add('delete');
	deleteBtn.innerHTML = '<i class="fas fa-times"></i>';

	// Dodawanie przycisków do div.tools
	const toolsDiv = document.createElement('div');
	toolsDiv.classList.add('tools');
	toolsDiv.appendChild(completeBtn);
	toolsDiv.appendChild(editBtn);
	toolsDiv.appendChild(deleteBtn);

	if (type === 'new') {
		// Dodawanie LI do UL_LIST
		UL_LIST.appendChild(NEW_TASK);

		// Dodawanie div.tools do LI
		NEW_TASK.appendChild(toolsDiv);
	} else {
		const editedTask = document.getElementById(EDITED_TODO_ID); // Pobierz edytowane zadanie na podstawie ID
		// Dodawanie div.tools do LI
		editedTask.appendChild(toolsDiv);
	}
};

const checkClick = event => {
	const clickedElement = event.target.closest('button');
	const listItem = clickedElement.closest('li'); // Znajdź najbliższy element LI

	if (clickedElement.classList.contains('complete')) {
		// Obsługa kliknięcia przycisku "complete"
		listItem.classList.toggle('completed'); // Dodaj klasę "completed" do LI
	} else if (clickedElement.classList.contains('edit')) {
		// Przypisz ID zadania do zmiennej EDITED_TODO_ID
		EDITED_TODO_ID = listItem.getAttribute('id');
		// Pobierz tekst zadania i ustaw go jako wartość w popupie
		const taskText = listItem.innerText;
		POPUP_INPUT.value = taskText;
		POPUP.style.display = 'flex';
	} else if (clickedElement.classList.contains('delete')) {
		// Obsługa kliknięcia przycisku "delete"
		listItem.remove(); // Usunięcie elementu LI
	}
};

const editTask = () => {
	const editedTask = document.getElementById(EDITED_TODO_ID); // Pobierz edytowane zadanie na podstawie ID
	if (POPUP_INPUT.value !== '') {
		const editedTaskText = POPUP_INPUT.value; // Nowy tekst zadania z popupu
		editedTask.innerText = editedTaskText; // Zaktualizuj tekst zadania
		createToolsArea();
		closePopup(); // Zamknij popup
	} else {
		POPUP_INFO.textContent = 'Wprowadź nową treść zadania!';
	}
};

const closePopup = () => {
	POPUP.style.display = 'none';
};

document.addEventListener('DOMContentLoaded', main);
