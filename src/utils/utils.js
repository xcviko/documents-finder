export const digitToArr = (digit) => {
    let arr = [];
    for (let i = 1; i <= digit; i++) {
        arr.push(i);
    }
    return arr;
}

export const isObjFilled = (obj) => {
    return Object.keys(obj).length;
}