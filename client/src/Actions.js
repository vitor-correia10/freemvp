export const addUser = (value, key) => {
    return {
        type: "ADD-USER",
        key,
        value,
    };
};

export const addTechnologies = (value, key) => {
    return {
        type: "ADD-TECHNOLOGIES",
        key,
        value,
    };
}

export const addProject = (value, key) => {
    return {
        type: "ADD-PROJECT",
        key,
        value,
    };
};

export const toggleLogin = () => {
    return {
        type: "TOGGLE-LOGIN",
    };
};

export const toggleModal = () => {
    return {
        type: "TOGGLE",
    };
};