// darkmode toggle

 const darkModeButton = document.getElementById('darkmode-toggle');
 const body = document.querySelector('body');
 const logo = document.getElementById('logo-main');

 darkModeButton.addEventListener('click', () => {
    body.classList.toggle('darkmode');
 })


//chnaging logo versions for darkmode, this is not working at the moment, will have to apply classes

 function changeLogo() {
   
  }

  darkModeButton.addEventListener('click', changeLogo)


// today' date

  
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

    const addNewButton = document.getElementById('add-new');
    console.log(addNewButton)
    const inputField = document.getElementById('new-task')
    console.log(inputField)

    const taskList = document.getElementById('new-tasklist');
    console.log(taskList)

    function addNewTask() {
        const newListItem = document.createElement('li')
        newListItem.className ='to-do task'
        const newListContent = document.createElement('span')
        newListContent.className = 'to-do'
        let newToDo = document.getElementById('new-task').value

        if(newToDo === "") {
            alert('Give me something to do')
        } else {
            newListContent.innerHTML = newToDo;
            newListItem.appendChild(newListContent);
            let firstChildNew = taskList.firstChild;
            taskList.insertBefore(newListItem, firstChildNew)
            //taskList.appendChild(newListItem)
            inputField.value = '';
        }
        
        // adding pencil and trashcan icons to the list items
        const listItems = document.getElementsByClassName('task')

        for(let i = 0; i<listItems.length; i++) {
            const pencil = document.createElement('i');
            pencil.className = "fa-solid fa-pencil pencil";
            listItems[i].appendChild(pencil)

            const trash = document.createElement('i');
            trash.className = "fa-solid fa-trash-can trash";
            listItems[i].appendChild(trash)

            const star = document.createElement('i');
            star.className = "fa fa-regular fa-star star";
            listItems[i].appendChild(star);

            const circle = document.createElement('i');
            circle.className = "fa-regular fa-circle circle";
            listItems[i].appendChild(circle);
        }

        //favorites marking
        const starIcon = document.getElementsByClassName('star')
        //console.log(starIcon)
        const starIconLi = document.getElementsByTagName('li.task')

        for(let i = 0; i < starIcon.length; i++) {
         starIcon[i].addEventListener('click', function() {

            this.classList.toggle("fa-regular");
            const parent = this.closest('li');
            const parentList = this.closest('ul');
            let firstParentChild = parentList.firstChild;
            const currentPosition = Array.from(parentList).indexOf(parent);


            if(currentPosition !== 0 && this.className.indexOf('fa-regular') === -1) {
            parentList.insertBefore(parent, firstParentChild)
            } 

            
         })
     }

     // completing tasks

     const completedList = document.getElementById('completed-tasks-list');
    console.log(completedList)
    
    let listItemsToDo = document.getElementsByClassName('to-do task')

    const circleIcon = document.getElementsByClassName('fa-regular fa-circle')
    console.log(circleIcon)

    for(let i = 0; i < circleIcon.length; i++) {
         circleIcon[i].addEventListener('click', function() {

            this.classList.remove('fa-circle')
            this.classList.add('fa-circle-check')
            this.classList.remove('fa-regular')
            this.classList.add('fa-solid')

            const parent = this.closest('li');
            let firstChild = completedList.firstChild;
            taskList.removeChild(parent);
            completedList.insertBefore(parent, firstChild)
            //completedList.appendChild(parent);
            let listSpan = parent.querySelector('span');
            listSpan.className = 'completed-task span'
         })
     }


    }


 

    addNewButton.addEventListener('click', addNewTask)
    

    inputField.addEventListener('keypress', function(event) {
        if(event.key === 'Enter') {
            addNewTask()
        }
    })



// FROM HERE DOWN everything is just a double, I kept them till the work is in progress

// adding pencil, trashcan and star icons to the list items

const listItems = document.getElementsByClassName('task')

for(let i = 0; i<listItems.length; i++) {
    const pencil = document.createElement('i');
    pencil.className = "fa-solid fa-pencil pencil";
    listItems[i].appendChild(pencil)

    const trash = document.createElement('i');
    trash.className = "fa-solid fa-trash-can trash";
    listItems[i].appendChild(trash)

    const star = document.createElement('i');
    star.className = "fa fa-regular fa-star star";
    listItems[i].appendChild(star);

    const circle = document.createElement('i');
    circle.className = "fa-regular fa-circle circle";
    listItems[i].appendChild(circle);
}


//favorites marking

const starIcon = document.getElementsByClassName('star')
console.log(starIcon)
//const starIconLi = document.getElementsByTagName('li.task')



for(let i = 0; i < starIcon.length; i++) {
         starIcon[i].addEventListener('click', function() {

            this.classList.toggle("fa-regular")
         })
     }




// completing tasks

//console.log(listItemsToDo)
// for(let i = 0; i < listItemsToDo.length; i++) {
    //     listItemsToDo[i].addEventListener('click', function() {
        //         taskList.removeChild(this);
        //         completedList.appendChild(this)
        //         this.classList.add('completed-task');
        //         let listSpan = this.querySelector('span');
        //         listSpan.className = 'completed-task span'
        //     })
        // }


    const completedList = document.getElementById('completed-tasks-list');
    console.log(completedList)
    
    let listItemsToDo = document.getElementsByClassName('to-do task')

    const circleIcon = document.getElementsByClassName('fa-regular fa-circle')
    console.log(circleIcon)

    for(let i = 0; i < circleIcon.length; i++) {
         circleIcon[i].addEventListener('click', function() {

            this.classList.remove('fa-circle')
            this.classList.add('fa-circle-check')
            this.classList.remove('fa-regular')
            this.classList.add('fa-solid')

            const parent = this.closest('li');
            taskList.removeChild(parent);
            completedList.appendChild(parent);
            let listSpan = parent.querySelector('span');
            listSpan.className = 'completed-task span'
         })
     }

