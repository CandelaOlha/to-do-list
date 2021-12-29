const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const tasksContainer = document.querySelector(".tasks-container");
const whiteSpace = document.querySelector(".white-space");

// JSON auxiliary functions

const convertToJSON = (object) => {
    const objectConvertedToJSON = JSON.stringify(object);

    return objectConvertedToJSON;
}

const convertFromJSON = (JSONObject) => {
    const JSONConvertedToObject = JSON.parse(JSONObject);

    return JSONConvertedToObject;
}

const saveInLocalStorage = (object, string) => {
    const objectConvertedToJSON = convertToJSON(object);

    localStorage.setItem(string, objectConvertedToJSON);
}

const getFromLocalStorage = (key) => {
    const savedObject = localStorage.getItem(key);
    const JavascriptObject = convertFromJSON(savedObject);

    return JavascriptObject;
}

const tasks = [];

const getTasks = () => {
    const tasksInLocalStorage = getFromLocalStorage("tasks");

    if (tasksInLocalStorage !== null) {
        return tasksInLocalStorage;
    }
    else {
        return tasks;
    }
}

const getCompletedTasks = () => {
    const completedTasksInLocalStorage = getFromLocalStorage("completed_tasks");

    if (completedTasksInLocalStorage !== null) {
        return completedTasksInLocalStorage;
    }
    else {
        return completedTasks;
    }
}

// Add task

taskForm.onsubmit = e => {
    e.preventDefault();

    const tasks = getTasks();
    const newTask = {
        description: taskInput.value, 
        status: "uncompleted",
    }

    tasks.push(newTask);
    
    taskInput.value = "";

    saveInLocalStorage(tasks, "tasks");
    displayTasksInHTML(tasks);
}

const getTaskStatus = (task) => {
    if (task.status === "completed") {
        return `text-decoration:line-through;`
    }
}

const displayTasksInHTML = arr => {
    const tasksInHTML = arr.reduce((acc, curr, index) => {
        return acc + `
        <div class="task-container">
            <div class="task-item" id="complete-task-${index}">
                <div class="completed-task">
                    <i class="fas fa-check icon"></i>
                </div>
                <p class="task-description" style=${getTaskStatus(curr)}>${curr.description}</p>
            </div>
            <div class="actions">
                <i class="far fa-edit"></i>
                <i class="far fa-trash-alt delete-icon" id="delete-task-${index}"></i>
            </div>
        </div>
        `
    }, "")

    tasksContainer.innerHTML = tasksInHTML;

    if (arr.length > 0) {
        whiteSpace.style.display = "none";
    }

    deleteTask();
    markTaskAsCompleted();
}

const deleteTask = () => {
    const deleteIcons = document.querySelectorAll(".delete-icon");

    for (let i = 0; i < deleteIcons.length; i++) {
        deleteIcons[i].onclick = () => {
            let tasks = getTasks();
            const taskID = Number(deleteIcons[i].id.slice(12));
            const filteredArray = tasks.filter((curr, index) => {
                return index !== taskID;
            })
            tasks = filteredArray;
            saveInLocalStorage(tasks, "tasks");
            displayTasksInHTML(getTasks());
        } 
    }
}

const markTaskAsCompleted = () => {
    const items = document.querySelectorAll(".task-item");

    for (let i = 0; i < items.length; i++) {
        items[i].onclick = () => {
            let tasks = getTasks();
            const taskID = Number(items[i].id.slice(14));
            tasks[taskID].status = "completed";
            saveInLocalStorage(tasks, "tasks");
            displayTasksInHTML(getTasks());
        }
    }
}

displayTasksInHTML(getTasks());