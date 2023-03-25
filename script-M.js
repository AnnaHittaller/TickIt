function openNav() {
  document.getElementById("mySidebar").style.width = "350px";
  document.getElementById("main").style.display = "none";
}

function closeNav() {
  document.getElementById("mySidebar").style.width = "0";
  document.getElementById("main").style.marginLeft = "0";
  document.getElementById("main").style.display = "";
}



  // Search Filter Function
function searchfunction() {
  var input, filter, ul, li, a, i, span, txtValue;
  input = document.getElementById("searchbar-desktop");
  filter = input.value.toUpperCase();
  ul = document.getElementById("new-tasklist");
  li = ul.getElementsByTagName("li");

  // Loop through all list items, and hide those who don't match the search query
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("span")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
  ul = document.getElementById("completed-tasks-list");
  li = ul.getElementsByTagName("li");
  
  for (i = 0; i < li.length; i++) {
    a = li[i].getElementsByTagName("span")[0];
    txtValue = a.textContent || a.innerText;
    if (txtValue.toUpperCase().indexOf(filter) > -1) {
      li[i].style.display = "";
    } else {
      li[i].style.display = "none";
    }
  }
}



// Show the Tasks from Today on the Sidebar
let todaysTasks = document.getElementById("new-tasklist").childElementCount;
document.querySelector(".my-day-marked").innerHTML = todaysTasks;


// Show the Completed Tasks on the Sidebar
let completedTasks = document.getElementById("completed-tasks-list").childElementCount;
document.querySelector(".completed-tasks").innerHTML = completedTasks;


// Show All Tasks on the Sidebar
let allTasks = document.getElementById("completed-tasks-list").childElementCount + 
                document.getElementById("new-tasklist").childElementCount;
document.querySelector(".all-tasks-marked").innerHTML = allTasks;


// // Show Important Tasks on the Sidebar
let importantTasks = document.getElementsByClassName("fa fa-star star")
console.log(importantTasks)
let importantTasksArray = Array.from(importantTasks)
let filteredImportantTasks = importantTasksArray.filter(task => {
  return !task.classList.contains('fa-regular')
})
console.log(filteredImportantTasks)
document.querySelector(".star-marked").innerHTML = filteredImportantTasks.length



// TEST
// function myFunction() {
//   var x = document.getElementsByClassName("fa fa-star star");
//   if (x.style.display === "none") {
//     x.style.display = "block";
//   } else {
//     x.style.display = "none";
//   }
// }