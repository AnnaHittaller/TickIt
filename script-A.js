// darkmode toggle

const darkModeButton = document.getElementById("darkmode-toggle");
const body = document.querySelector("body");
const logo = document.getElementById("logo-main");
const logo2 = document.getElementById("logo-main-2");

darkModeButton.addEventListener("click", () => { 
	if(darkModeButton.checked === true) {
		localStorage.setItem("darkmode-toggle", "true")
	} else {
		localStorage.setItem("darkmode-toggle", "false");
	}
	renderDarkmode()
});

//saving and retrieving the darkmode settings and the checked state of the toggle button from local storage when page is refreshed
function renderDarkmode() {
	let toggleValue = localStorage.getItem("darkmode-toggle");
	if(toggleValue === "true") {
		darkModeButton.checked = true;
		body.classList.add("darkmode");
		logo.classList.add("logo-hidden");
		logo2.classList.remove("logo-hidden");
	} else if (toggleValue === "false") {
		body.classList.remove("darkmode");
		logo.classList.remove("logo-hidden");
		logo2.classList.add("logo-hidden");
	}
}

window.addEventListener('load', renderDarkmode)

// sidebar slideout

const hamburger = document.getElementById("hamburger-button");
const sidebar = document.getElementById("sidebar");
const main = document.getElementById("main");
hamburger.addEventListener("click", () => {
	sidebar.classList.toggle("slideout");
	main.classList.toggle("notscroll");
});


//slidebar closes when we click outside of it, we don't have to always use the hamburger icon
window.addEventListener('click', (e) => {
 	//console.log(e.target.id)
	if(e.target.id !== "hamburger-img") {
		if(sidebar.className.includes('slideout') && !sidebar.contains(e.target)) {
			sidebar.classList.remove("slideout");
			main.classList.remove('notscroll')
		}
	}
 })


// today's date

const today = new Date();

const options = {
	day: "numeric",
	month: "long",
	year: "numeric",
};

const formattedDate = today.toLocaleDateString("en-GB", options);

const dateSpan = document.getElementById("date");
dateSpan.innerHTML = formattedDate;

// Adding new tasks

const addNewButton = document.getElementById("add-new");
const inputField = document.getElementById("new-task");
let taskList = document.getElementById("new-tasklist");

// retrieving tasks from the local storage

let toDoList = [];
getItemsFromStorage();

function addNewTask() {
	//creating a new li item and a span within, with the necessary classes
	const newListItem = document.createElement("li");
	newListItem.className = "to-do task";
	const newListContent = document.createElement("span");
	newListContent.className = "to-do span";
	let newToDo = document.getElementById("new-task").value;
	//defining the properties which the items in the local storage will have
	if (newToDo === "") {
		inputField.value = "";
	} else {
		var newTask = {
			task: newToDo,
			date: Date.now(),
			completed: false,
			favorite: false,
		};

		// adding pencil, star, circle and trashcan icons to the list items when they are getting created
		const pencil = document.createElement("i");
		pencil.className = "fa-solid fa-pencil pencil";
		const trash = document.createElement("i");
		trash.className = "fa-solid fa-trash-can trash";
		const star = document.createElement("i");
		star.className = "fa fa-regular fa-star star";
		const circle = document.createElement("i");
		circle.className = "fa-regular fa-circle circle";

		//inserting the span in the li item, and adding it to the first place of the new task list
		newListContent.innerHTML = newToDo;
		newListItem.appendChild(newListContent);

		newListItem.appendChild(pencil);
		newListItem.appendChild(star);
		newListItem.appendChild(trash);
		newListItem.appendChild(circle);

		let firstChildNew = taskList.firstChild;
		taskList.insertBefore(newListItem, firstChildNew);
		//pushing the items in the array and then to local storage
		toDoList.push(newTask);
		newListContent.id = toDoList.length - 1;
		localStorage.setItem("to-do-list", JSON.stringify(toDoList));

		inputField.value = "";
	}

	// here these few functions are just event listeners added to every newly generated item, the functions itself are
	// written below

	//favorites marking

	let starIcon = document.getElementsByClassName("star");
	//const starIconLi = document.getElementsByTagName("li.task");

	for (let i = 0; i < starIcon.length; i++) {
		starIcon[i].addEventListener("click", markFavorite);
	}

	// completing tasks

	let circleIcon = document.getElementsByClassName("circle");

	for (let i = 0; i < circleIcon.length; i++) {
		circleIcon[i].addEventListener("click", taskComplete);
	}

	//deleting items

	const trashIcon = document.getElementsByClassName("trash");
	for (let i = 0; i < trashIcon.length; i++) {
		trashIcon[i].addEventListener("click", removeItem);
	}

	//editing items
	const pencilIcon = document.getElementsByClassName("pencil");
	for (let i = 0; i < pencilIcon.length; i++) {
		pencilIcon[i].addEventListener("click", editItem);
	}
}

// end of the addnew function

//adding functionality to the add new button and making it work with pressing enter too
addNewButton.addEventListener("click", addNewTask);

inputField.addEventListener("keypress", function (event) {
	if (event.key === "Enter") {
		addNewTask();
	}
});

//favorites marking

let starIcon = document.getElementsByClassName("star");

for (let i = 0; i < starIcon.length; i++) {
	starIcon[i].addEventListener("click", markFavorite);
}

function markFavorite() {
	const parent = this.closest("li");
	const parentList = this.closest("ul");
	let firstParentChild = parentList.firstChild;
	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);
	var thisItem = this.parentNode.firstChild;

	// identifying the items in local storage, updating their favorite property and making them jump to the first place
	//of their list when toggled
	for (let i = 0; i < todoArr.length; i++) {
		if (
			todoArr[i].task === thisItem.innerHTML &&
			todoArr[i].favorite === false
		) {
			todoArr[i].favorite = true;
			parentList.insertBefore(parent, firstParentChild);
			this.classList.remove("fa-regular");
		} else if (
			todoArr[i].task === thisItem.innerHTML &&
			todoArr[i].favorite === true
		) {
			todoArr[i].favorite = false;
			this.classList.add("fa-regular");
		}
	}
	toDoList = todoArr;
	storageUpdate();
}

//completing tasks

let completedList = document.getElementById("completed-tasks-list");
let circleIcon = document.getElementsByClassName("circle");

for (let i = 0; i < circleIcon.length; i++) {
	circleIcon[i].addEventListener("click", taskComplete);
}

//toggling classes for completion (checked circle, strikethrough text), moving items to the other list,
// and updating their proprties in local storage
function taskComplete() {
	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);
	var thisItem = this.parentNode.firstChild;
	const parent = this.closest("li");
	let listSpan = parent.querySelector("span");

	for (let i = 0; i < todoArr.length; i++) {
		if (todoArr[i].task === thisItem.innerHTML) {
			if (todoArr[i].completed === false) {
				this.classList.remove("fa-circle");
				this.classList.add("fa-circle-check");
				this.classList.remove("fa-regular");
				this.classList.add("fa-solid");
				parent.className = "task completed-task";
				listSpan.className = "completed-task span";
				todoArr[i].completed = true;
				taskList.removeChild(parent);
				completedList.insertBefore(parent, completedList.childNodes[0]);
			} else if (todoArr[i].completed === true) {
				this.classList.remove("fa-circle-check");
				this.classList.add("fa-circle");
				this.classList.remove("fa-solid");
				this.classList.add("fa-regular");
				parent.className = "to-do task";
				listSpan.className = "to-do span";
				todoArr[i].completed = false;
				completedList.removeChild(parent);
				taskList.insertBefore(parent, taskList.childNodes[0]);
			}
		}
		toDoList = todoArr;
	}
	storageUpdate();
}

//deleting items

const trashIcon = document.getElementsByClassName("trash");

for (let i = 0; i < trashIcon.length; i++) {
	trashIcon[i].addEventListener("click", removeItem);
}

//removing items from the lists, finding their references in local storage and deleting them too by splicing the parsed array and stringify it again
function removeItem() {
	const parent = this.parentNode;
	const parentList = this.parentNode.parentNode;
	parentList.removeChild(parent);

	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);

	var thisItem = this.parentNode.firstChild;

	for (let i = 0; i < todoArr.length; i++) {
		if (todoArr[i].task === thisItem.innerHTML) {
			todoArr.splice(i, 1);
		}
	}
	toDoList = todoArr;

	storageUpdate();
}

//rendering every items which are in the local storage according to their saved properties
//so they get the classes and are placed accordingly - completed stays completed, marked stays marked
function getItemsFromStorage() {
	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);
	if (todoArr) {
		todoArr.forEach((object) => {
			const newListItem = document.createElement("li");
			const newListContent = document.createElement("span");
			newListContent.innerHTML = object.task;
			newListItem.appendChild(newListContent);
			//the icons have to be added again, as they are not stored in local storage
			const pencil = document.createElement("i");
			pencil.className = "fa-solid fa-pencil pencil";
			newListItem.appendChild(pencil);

			const trash = document.createElement("i");
			trash.className = "fa-solid fa-trash-can trash";
			newListItem.appendChild(trash);

			const star = document.createElement("i");

			const circle = document.createElement("i");

			if (object.favorite === false) {
				star.className = "fa fa-regular fa-star star";
			} else if (object.favorite === true) {
				star.className = "fa fa-star star";
			}

			if (object.completed === false) {
				newListItem.className = "to-do task";
				newListContent.className = "to-do span";
				circle.className = "fa-regular fa-circle circle";
				taskList.insertBefore(newListItem, taskList.childNodes[0]);
			} else if (object.completed === true) {
				let completedList = document.getElementById("completed-tasks-list");
				newListItem.className = "task completed-task";
				newListContent.className = "completed-task span";
				circle.className = "fa-solid fa-circle-check circle";
				completedList.insertBefore(newListItem, completedList.childNodes[0]);
			}

			newListItem.appendChild(star);
			newListItem.appendChild(circle);

			toDoList.push(object);
			newListContent.id = toDoList.length - 1;
			storageUpdate();
		});
	}
}

//updating the local storage based on the modified parsed array of items

function storageUpdate() {
	localStorage.setItem("to-do-list", JSON.stringify(toDoList));
}

// editing tasks

const pencilIcon = document.getElementsByClassName("pencil");
for (let i = 0; i < pencilIcon.length; i++) {
	pencilIcon[i].addEventListener("click", editItem);
}

function editItem() {
	//when clicked, the inner span gets replaced by an input field, and some appearances change to signify the edit mode
	const spanToEdit = this.parentNode.children[0];
	const parentLi = this.parentNode;
	let id = spanToEdit.id;
	const editInput = document.createElement("input");

	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);

	editInput.setAttribute("type", "text");
	editInput.className = "edit";

	editInput.value = spanToEdit.textContent;
	spanToEdit.textContent = "";
	spanToEdit.appendChild(editInput);
	editInput.focus();
	parentLi.style.backgroundColor = "#FFF0D3";
	this.style.color = "rgb(245, 177, 50)";

	//when clicked outside of the field, the content gets taken by the span, which will be saved as the new task property of the local storage item
	//based on the id the span got when created, which is the same as their index in the todolist array
	editInput.onblur = () => {
		this.style.color = "var(--accentcolor-light)";
		//if the span is empty when it is clicked outside, the empty item is not saved to local storage but instead gets deleted, with enter this can't be done, just with clicking outside
		if (editInput.value === "") {
			const parentList = parentLi.parentNode;
			parentList.removeChild(parentLi);
			todoArr.splice(id, 1);
			toDoList = todoArr;
			storageUpdate();
		} else {
			parentLi.style.backgroundColor = "#FFF";
			todoArr[id].task = editInput.value;
			spanToEdit.textContent = editInput.value;
			editInput.style.display = "none";
			toDoList = todoArr;
			storageUpdate();
		}
	};
	//it works with pressing enter after finished editing too
	editInput.onkeydown = (event) => {
		if (event.key === "Enter" && editInput.value) {
			parentLi.style.backgroundColor = "#FFF";
			todoArr[id].task = editInput.value;
			spanToEdit.textContent = editInput.value;
			editInput.style.display = "none";
			toDoList = todoArr;
			storageUpdate();
		}
	};
}
