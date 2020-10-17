const initialState = {
    isOpen: false,
};

const modalTogglerReducer = (state = initialState, action) => {
    const newState = { ...state };

    switch (action.type) {
        case "TOGGLE": {
            return {
                isOpen: !newState.isOpen,
            };
        }
        default: {
            return state;
        }
    }
};

export default modalTogglerReducer;
