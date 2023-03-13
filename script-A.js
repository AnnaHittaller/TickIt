// darkmode toggle

 const darkModeButton = document.getElementById('darkmode-toggle');
 const body = document.querySelector('body');
 const logo = document.getElementById('logo-main');const logo2 = document.getElementById("logo-main-2");

 darkModeButton.addEventListener("click", () => {
		body.classList.toggle("darkmode");
		logo.classList.toggle("logo-hidden");
		logo2.classList.toggle("logo-hidden");
 });

// sidebar slideout

const hamburger = document.getElementById('hamburger-button');
const sidebar = document.getElementById('sidebar')
const main = document.getElementById('main')
hamburger.addEventListener('click', () => {
    sidebar.classList.toggle('slideout')
    main.classList.toggle('notscroll')
});


// today's date

  
  const today = new Date();
  
  const options = { 
      day: 'numeric', 
      month: 'long', 
      year: 'numeric'
    };
    
    const formattedDate = today.toLocaleDateString('en-GB', options);

    const dateSpan = document.getElementById('date');
    dateSpan.innerHTML = formattedDate;

// Adding new tasks

const addNewButton = document.getElementById("add-new");
const inputField = document.getElementById("new-task");
let taskList = document.getElementById("new-tasklist");


// retrieving tasks from the local storage

let toDoList = [];
getItemsFromStorage();

function addNewTask() {
	const newListItem = document.createElement("li");
	newListItem.className = "to-do task";
	const newListContent = document.createElement("span");
	newListContent.className = "to-do span";
	let newToDo = document.getElementById("new-task").value;

	if (newToDo === "") {
		inputField.value = "";
	} else {
		var newTask = {
			task: newToDo,
			date: Date.now(),
			completed: false,
			favorite: false,
		};

		newListContent.innerHTML = newToDo;
		newListItem.appendChild(newListContent);
		let firstChildNew = taskList.firstChild;
		taskList.insertBefore(newListItem, firstChildNew);

		toDoList.push(newTask);
		localStorage.setItem("to-do-list", JSON.stringify(toDoList));

		inputField.value = "";
	}

	// adding pencil and trashcan icons to the list items

	const listItems = document.getElementsByClassName("task");

	for (let i = 0; i < listItems.length; i++) {
		const pencil = document.createElement("i");
		pencil.className = "fa-solid fa-pencil pencil";
		listItems[i].appendChild(pencil);

		const trash = document.createElement("i");
		trash.className = "fa-solid fa-trash-can trash";
		listItems[i].appendChild(trash);

		const star = document.createElement("i");
		star.className = "fa fa-regular fa-star star";
		listItems[i].appendChild(star);

		const circle = document.createElement("i");
		circle.className = "fa-regular fa-circle circle";
		listItems[i].appendChild(circle);
	}

	//favorites marking

	let starIcon = document.getElementsByClassName("star");
	//const starIconLi = document.getElementsByTagName("li.task");

	for (let i = 0; i < starIcon.length; i++) {
		starIcon[i].addEventListener("click", markFavorite);
	}

	// completing tasks

	let circleIcon = document.getElementsByClassName("fa-regular fa-circle");
	//console.log(circleIcon);

	for (let i = 0; i < circleIcon.length; i++) {
		circleIcon[i].addEventListener("click", taskComplete);
	}

	//deleting items

	const trashIcon = document.getElementsByClassName("trash");
	for (let i = 0; i < trashIcon.length; i++) {
		trashIcon[i].addEventListener("click", removeItem);
	}
}

// end of the addnew function

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
	//const currentPosition = Array.from(parentList).indexOf(parent);
	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);
	var thisItem = this.parentNode.firstChild;

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
let circleIcon = document.getElementsByClassName("fa-regular fa-circle");

for (let i = 0; i < circleIcon.length; i++) {
	circleIcon[i].addEventListener("click", taskComplete);
}

function taskComplete() {
	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);
	var thisItem = this.parentNode.firstChild;
	const parent = this.closest("li");
	let listSpan = parent.querySelector("span");

	for (let i = 0; i < todoArr.length; i++) {
		if (todoArr[i].task === thisItem.innerHTML) {
			//todoArr[i].completed = true;
			if (todoArr[i].completed === false) {
				this.classList.remove("fa-circle");
				this.classList.add("fa-circle-check");
				this.classList.remove("fa-regular");
				this.classList.add("fa-solid");
				parent.className = "task completed-task";
				//let firstChild = completedList.firstChild;
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
				//let firstChild = completedList.firstChild;
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



function getItemsFromStorage() {
	const todosFromStorage = localStorage.getItem("to-do-list");
	const todoArr = JSON.parse(todosFromStorage);
	if (todoArr) {
		todoArr.forEach((object) => {
			const newListItem = document.createElement("li");
			const newListContent = document.createElement("span");
			newListContent.innerHTML = object.task;
			newListItem.appendChild(newListContent);

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
			storageUpdate();
		});
	}
}

function storageUpdate() {
	localStorage.setItem("to-do-list", JSON.stringify(toDoList));
}