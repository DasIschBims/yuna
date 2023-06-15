export const convertDDMMYYYYToMMDDYYYY = (date: string): string => {
    const parts = date.split('/');
    if (parts.length === 3) {
        const day = parts[0];
        const month = parts[1];
        const year = parts[2];
        return month + '/' + day + '/' + year;
    }
    return date;
};