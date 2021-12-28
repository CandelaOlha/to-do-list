const taskForm = document.querySelector(".task-form");
const taskInput = document.querySelector(".task-input");

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

// Add task

taskForm.onsubmit = e => {
    e.preventDefault();

    const tasks = getTasks();
    const newTask = taskInput.value;

    tasks.push(newTask);
    
    taskInput.value = "";

    saveInLocalStorage(tasks, "tasks");
}