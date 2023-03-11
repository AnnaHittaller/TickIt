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
    //console.log(addNewButton)
    const inputField = document.getElementById('new-task')
    //console.log(inputField)

    const taskList = document.getElementById('task-to-do');
    //console.log(taskList)







// completing tasks

   const completed = document.getElementById('completed');
   //console.log(completed)





// adding pencil and trashcan icons to the list items

const listItems = document.getElementsByClassName('task')

for(let i = 0; i<listItems.length; i++) {
    const pencil = document.createElement('i');
    pencil.className = "fa-solid fa-pencil pencil";
    listItems[i].appendChild(pencil)

    const trash = document.createElement('i');
    trash.className = "fa-solid fa-trash-can trash";
    listItems[i].appendChild(trash)
}