const initialState = {};

const WorkingProjects = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-WORKING-PROJECTS': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'UPDATE-WORKING-PROJECT': {
            return {
                ...state,
                [action.key]: action.value
            }
        }
        case 'REMOVE-WORKING-PROJECTS': {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
}

export default WorkingProjects;