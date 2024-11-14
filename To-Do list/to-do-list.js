const inputbox = document.getElementById("task-input");
const listcontainer = document.getElementById("to-do-list");

function addTask() {
    if (inputbox.value === '') {
        alert("You must write something!");
    } else {
        let li = document.createElement("li");
        li.innerHTML = inputbox.value;
        listcontainer.appendChild(li);

        // delete button
        let span = document.createElement("span");
        span.innerHTML = "\u00d7"; 
        span.classList.add("close");
        li.appendChild(span);

        // delete the task when '×' is clicked
        span.onclick = function () {
            li.remove();
            saveData(); 
        };
    }

    // Clear the input box after adding the task
    inputbox.value = "";
    saveData();
}

listcontainer.addEventListener("click", function(e){
    if(e.target.tagName === "LI"){
        e.target.classList.toggle("checked");
        saveData();
    }
}, false);

function saveData(){
    localStorage.setItem("data", listcontainer.innerHTML);
}

function showTask(){
    if (localStorage.getItem("data")) {
        listcontainer.innerHTML = localStorage.getItem("data");
        // Reapply the delete event listener to all 'span' elements after loading
        const closeButtons = document.querySelectorAll(".close");
        closeButtons.forEach(function(button) {
            button.onclick = function() {
                button.parentElement.remove();
                saveData(); // Save after removing the task
            };
        });
    }
}

// Show tasks on page load
showTask();
