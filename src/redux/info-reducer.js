const SET_PAGE = 'SET_PAGE';

let initialState = {
    page: 1
};

const searchFormReducer = (state = initialState, action) => {
    switch (action.type) {

        case SET_PAGE:
            return {
                ...state,
                page: action.page
            };

        default:
            return state;
    }
}

export const setPage = (page) => ({type: SET_PAGE, page});


export default searchFormReducer;