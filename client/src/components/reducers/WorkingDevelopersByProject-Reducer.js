const initialState = {};

const WorkingDevelopersByProject = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-WORKING-DEVELOPERS': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'UPDATE-WORKING-DEVELOPERS': {
            return {
                ...state,
                state: action.value
            }
        }
        case 'REMOVE-WORKING-DEVELOPERS': {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
}

export default WorkingDevelopersByProject;