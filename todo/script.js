document.addEventListener("DOMContentLoaded", () => {
    displayTasks();
});


const taskInput = document.getElementById('taskInput');
const addButton = document.querySelector('#add-btn');

addButton.addEventListener("click", (e) => {
    e.preventDefault();
    const taskText = taskInput.value.trim();
    if(taskText){
        const task = {
            text: taskText,
            completed: false,
            createdAt: Date.now()
        }

        const tasks = JSON.parse(localStorage.getItem("tasks")) || [];
        tasks.push(task);
        localStorage.setItem("tasks", JSON.stringify(tasks));
        taskInput.value = '';
        displayTasks();
    }
});

function displayTasks() {
    const taskList = document.getElementById('taskList');
    taskList.innerHTML = '';

    const tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, i) => {
        const li = document.createElement('li');
       

        li.textContent = `${i + 1} `+ task.text;
        li.className = task.completed ? 'completed task-item' : 'task-item';
        
        const deleteButton = document.createElement("button");
        deleteButton.innerHTML = "&#10006;"
        deleteButton.className = "delete-btn";

        deleteButton.addEventListener("click", () => {
            tasks.splice(i, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        });

        const editButton = document.createElement("button");
        editButton.innerHTML = "&#9998;";
        editButton.className = "edit-btn";

        editButton.addEventListener("click", () => {
            const newText = prompt("Edit task:", task.text);

            tasks[i].text = newText;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        });

        const taskActions = document.createElement("div");
        taskActions.className = "task-actions";
        taskActions.appendChild(editButton);
        taskActions.appendChild(deleteButton);

        li.appendChild(taskActions);
        
        taskList.appendChild(li);   
    });
   
}