export const addDeveloper = (value, key) => {
    return {
        type: "ADD-DEVELOPER",
        key,
        value,
    };
};

export const toggleLogin = () => {
    return {
        type: "TOGGLE",
    };
};