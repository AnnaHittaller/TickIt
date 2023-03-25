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
}

// Show the Tasks from Today on the Sidebar
let todaysTasks = document.getElementById("new-tasklist").childElementCount;
document.querySelector(".number").innerHTML = todaysTasks;


// Show the Completed Tasks on the Sidebar
let completedTasks = document.getElementById("completed-tasks-list").childElementCount;
document.querySelector(".number2").innerHTML = completedTasks;


// Show All Tasks on the Sidebar
let allTasks = document.getElementById("completed-tasks-list").childElementCount + 
                document.getElementById("new-tasklist").childElementCount;
document.querySelector(".number3").innerHTML = allTasks;


// // Show Important Tasks on the Sidebar
// let importantTasks = document.getElementsByClassName("fa fa-star star").childElementCount;
// document.querySelector(".number4").innerHTML = importantTasks;