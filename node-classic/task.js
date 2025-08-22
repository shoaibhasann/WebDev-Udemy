const fs = require("fs");
const filePath = "./tasks.json";

const command = process.argv[2];
const argument = process.argv[3];

if(command === "add"){
    addTask(argument);
} else if(command === "list"){
    loadTasks();
} else if(command === "remove"){
    removeTask(String(argument));
}

function addTask(task){
    const tasks = loadTasks();
    tasks.push({task});
    saveTasks(tasks);
    console.log("Task Added successfully");
}

function loadTasks(){
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJSON = dataBuffer.toString();
        return JSON.parse(dataJSON);

    } catch (error) {
        console.log(error);
        return [];
    }
}

function saveTasks(tasks){
    const dataJSON = JSON.stringify(tasks);
    fs.writeFileSync(filePath, dataJSON);
}

function removeTask(task){
    const tasks = loadTasks();

    const updatedTasks = tasks.filter((t) => t.task !== task);
    fs.writeFileSync(filePath, JSON.stringify(updatedTasks));
}
