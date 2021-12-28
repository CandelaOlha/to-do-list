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