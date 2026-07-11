export const parseDate = (date: string): Date => {
    const parsedDate = new Date(date);

    if (Number.isNaN(parsedDate.getTime())) {
        throw new Error(`Invalid Date : ${date}`);
    }

    return parsedDate;
};