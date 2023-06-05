export const getDaysArray = (start: Date, end: Date) => {
    let arr = [];
    let dt = new Date(start);
    for (;
        dt <= end;
        dt.setDate(dt.getDate() + 1)
    ) {
        arr.push(new Date(dt));
    }
    return arr;
};