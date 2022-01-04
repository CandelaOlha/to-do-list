const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");
const errorMessage = document.querySelector(".error-message");
const tasksContainer = document.querySelector(".tasks-container");
const whiteSpace = document.querySelector(".white-space");

// JSON auxiliary functions

const convertToJSON = object => {
    const objectConvertedToJSON = JSON.stringify(object);

    return objectConvertedToJSON;
}

const convertFromJSON = JSONObject => {
    const JSONConvertedToObject = JSON.parse(JSONObject);

    return JSONConvertedToObject;
}

const saveInLocalStorage = (object, string) => {
    const objectConvertedToJSON = convertToJSON(object);

    localStorage.setItem(string, objectConvertedToJSON);
}

const getFromLocalStorage = key => {
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

const displayErrorMessage = () => {
    taskInput.style.borderColor = "#ef767a";
    errorMessage.style.display = "block";
}

const hideErrorMessage = () => {
    taskInput.style.borderColor = "#706c61";
    errorMessage.style.display = "none";
}

// Add task

taskForm.onsubmit = e => {
    e.preventDefault();

    if (taskInput.value.length === 0) {
        displayErrorMessage();
    }
    else {
        hideErrorMessage();

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
}

const addCheckIcon = task => {
    if (task.status === "completed") {
        return `opacity:1;`
    }
}

const getTaskStatus = task => { 
    if (task.status === "completed") {
        return `text-decoration:line-through;`
    }
}

/* Note: while I think it's better not to use the style attribute within an HTML tag, 
it is the best way I found to add styles to task items based on a condition so far. */

const displayTasksInHTML = arr => {
    const tasksInHTML = arr.reduce((acc, curr, index) => {
        return acc + `
        <div class="task-container">
            <div class="task-item">
                <div class="icon-container" id="complete-task-${index}">
                    <i class="fas fa-check icon" style=${addCheckIcon(curr)}></i>
                </div>
                <p role="textbox" contenteditable class="task-description" id="task-description-${index}" style=${getTaskStatus(curr)}>${curr.description}</p>
            </div>
            <div class="actions">
                <i class="far fa-edit edit-icon" id="edit-task-${index}"></i>
                <i class="far fa-trash-alt delete-icon" id="delete-task-${index}"></i>
            </div>
        </div>
        `
    }, "")

    tasksContainer.innerHTML = tasksInHTML;

    if (arr.length > 0) {
        whiteSpace.style.display = "none";
    }
    else {
        whiteSpace.style.display = "flex";
        hideErrorMessage();
    }

    editTask();
    displayEditMode();
    deleteTask();
    markTaskAsCompleted();
}

const editTask = () => {
    const taskDescriptions = document.querySelectorAll(".task-description");

    for (let i = 0; i < taskDescriptions.length; i++) {
        taskDescriptions[i].oninput = () => {
            let tasks = getTasks();
            const taskID = Number(taskDescriptions[i].id.slice(17));
            tasks[taskID].description = taskDescriptions[i].textContent;
            saveInLocalStorage(tasks, "tasks");
        }
    }
}

const displayEditMode = () => {
    const editIcons = document.querySelectorAll(".edit-icon");
    const taskDescriptions = document.querySelectorAll(".task-description");

    for (let i = 0; i < editIcons.length; i++) {
        editIcons[i].onclick = () => {
            const taskID = Number(editIcons[i].id.slice(10));
            taskDescriptions[taskID].focus();
        }
    }
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
    const iconContainers = document.querySelectorAll(".icon-container");

    for (let i = 0; i < iconContainers.length; i++) {
        iconContainers[i].onclick = () => {
            let tasks = getTasks();
            const taskID = Number(iconContainers[i].id.slice(14));

            if (tasks[taskID].status === "uncompleted") {
                tasks[taskID].status = "completed";
                saveInLocalStorage(tasks, "tasks");
                displayTasksInHTML(getTasks());
            }
            else if (tasks[taskID].status === "completed") {
                tasks[taskID].status = "uncompleted";
                saveInLocalStorage(tasks, "tasks");
                displayTasksInHTML(getTasks());
            }
        }
    }
}

displayTasksInHTML(getTasks());