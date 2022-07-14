import * as axios from "axios";
import {isObjFilled} from "../utils/utils";

const instance = axios.create({
    withCredentials: true,
    baseURL: 'http://localhost:3001/'
});

const getQuery = (params, methods, page, limit) => {

    //formatting params and methods to query string
    params = {...params.main, ...params.additional}
    let methodsQuery = '';
    if (isObjFilled(params) && isObjFilled(methods)) {
        //setting main params to query
        params.id
            ? methodsQuery += `&id=${params.id}`
            : methods.sortBy.map( el => methodsQuery += `&${el}_like=${params[el]}` )

        //setting order & sort methods to query
        methodsQuery += `&_order=${methods.orderBy}&_sort=`;
        methods.sortBy.map( el => methodsQuery += `${el},` );
        methodsQuery = methodsQuery.slice(0, -1);
    }
    return `data?_page=${page}&_limit=${limit}${methodsQuery}`;
}

export const dataAPI = {
    getData(params = {}, methods = {}, page = 1, limit = 1) {
        const query = getQuery(params, methods, page, limit);
        //requesting items with limit
        return instance.get(query).then(response => response.data);
    },
    getAllItemsCount(params = {}, methods = {}, limit = 1) {
        //requesting items without limit to count the pages
        //на сколько знаю, выдавать кол-во всех элементов из БД должен бэкэнд. В моем моке "json-server" такой реализации нет, поэтому захардкодил 10000
        const query = getQuery(params, methods, 1, limit).replace(`&_limit=${limit}`, '&_limit=10000');
        return instance.get(query).then(response => Object.keys(response.data).length);
    }
}