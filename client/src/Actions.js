export const addUser = (value, key) => {
    return {
        type: "ADD-USER",
        key,
        value,
    };
};

export const addLoggedInUser = (value, key) => {
    return {
        type: "ADD-LOGGEDIN-USER",
        key,
        value,
    };
};

export const updateUser = (value, key) => {
    return {
        type: "UPDATE-USER",
        key,
        value,
    };
};

export const removeLoggedInUser = (value, key) => {
    return {
        type: "REMOVE-LOGGEDIN-USER",
        key,
        value,
    };
};

export const addUserTechnologies = (value, key) => {
    return {
        type: "ADD-USER-TECHNOLOGIES",
        key,
        value,
    };
}

export const addProjectTechnologies = (value, key) => {
    return {
        type: "ADD-PROJECT-TECHNOLOGIES",
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

export const updateProject = (value, key) => {
    return {
        type: "UPDATE-PROJECT",
        key,
        value,
    };
};

export const addLoggedInProject = (value, key) => {
    return {
        type: "ADD-LOGGEDIN-PROJECT",
        key,
        value,
    };
};

export const removeLoggedInProject = (value, key) => {
    return {
        type: "REMOVE-LOGGEDIN-PROJECT",
        key,
        value,
    };
};

export const toggleModal = () => {
    return {
        type: "TOGGLE",
    };
};

export const addRelatedProjects = (value, key) => {
    return {
        type: "ADD-RELATED-PROJECTS",
        key,
        value,
    };
};

export const removeRelatedProjects = (value, key) => {
    return {
        type: "REMOVE-RELATED-PROJECTS",
        key,
        value,
    };
};

export const addRelatedUsers = (value, key) => {
    return {
        type: "ADD-RELATED-USERS",
        key,
        value,
    };
};

export const removeRelatedUsers = (value, key) => {
    return {
        type: "REMOVE-RELATED-USERS",
        key,
        value,
    };
};