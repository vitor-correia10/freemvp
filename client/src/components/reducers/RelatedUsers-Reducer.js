const initialState = {};

const RelatedUsers = (state = initialState, action) => {
    switch (action.type) {
        case 'ADD-RELATED-USERS': {
            return {
                ...state,
                ...action.value,
            }
        }
        case 'REMOVE-RELATED-USERS': {
            return {
                ...initialState,
            }
        }
        default: {
            return state;
        }
    }
}

export default RelatedUsers;