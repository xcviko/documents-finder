import {dataAPI} from "../api/api";

const SET_DATA = 'SET_DATA';
const SET_PARAMS = 'SET_PARAMS';
const SET_PAGES = 'SET_PAGES';
const SET_SORT = 'SET_SORT';
const REMOVE_SORT = 'REMOVE_SORT';
const SET_ORDER = 'SET_ORDER';

let initialState = {
    params: {
        main: {
            id: '',
            document_name: ''
        },
        additional: {
            creation_date: '',
            email: '',
            first_name: '',
            last_name: ''
        },
    },
    queryMethods: {
        sortBy: ['id', 'document_name'],
        /*sortBy: ['id', 'document_name', 'creation_date', 'email', 'first_name', 'last_name'],*/
        orderBy: 'asc'
    },
    data: {},
    pages: 0,
    limit: 5
};

const searchFormReducer = (state = initialState, action) => {
    switch (action.type) {
        case SET_DATA:
            return {
                ...state,
                data: action.data
            };

        case SET_PARAMS:
            return {
                ...state,
                params: {
                    main: {...action.data.main},
                    additional: typeof(action.data.additional) !== 'undefined'
                        ? {...state.params.additional, ...action.data.additional}
                        : {...state.params.additional}
                }
            };

        case SET_PAGES:
            return {
                ...state,
                pages: action.items ? Math.ceil(action.items / state.limit) : 0
            };

        case SET_SORT:
            return {
                ...state,
                queryMethods: {
                    ...state.queryMethods,
                    sortBy: [...state.queryMethods.sortBy, action.method]
                }
            };

        case REMOVE_SORT:
            return {
                ...state,
                queryMethods: {
                    ...state.queryMethods,
                    sortBy: state.queryMethods.sortBy.filter(el => el !== action.method)
                }
            };

        case SET_ORDER:
            return {
                ...state,
                queryMethods: {
                    ...state.queryMethods,
                    orderBy: action.method
                }
            };

        default:
            return state;
    }
}

export const setParams = (data) => ({type: SET_PARAMS, data});
export const setPages = (items) => ({type: SET_PAGES, items});
export const setSort = (method) => ({type: SET_SORT, method});
export const removeSort = (method) => ({type: REMOVE_SORT, method});
export const setOrder = (method) => ({type: SET_ORDER, method});

const setData = (data) => ({type: SET_DATA, data});

export const getData = (params, methods, page, limit) => async (dispatch) => {

    const data = await dataAPI.getData(params, methods, page, limit);
    const items = await dataAPI.getAllItemsCount(params, methods, page, limit);
    dispatch(setData(data));
    dispatch(setPages(items));
}


export default searchFormReducer;