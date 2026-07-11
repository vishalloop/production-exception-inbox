export const parseDate = (value: string): Date => {
    const trimmed = value.trim();

    if (trimmed.includes("/")) {
        const [day = 0, month = 0, year = 0] = trimmed.split("/").map(Number);

        const date = new Date(year, month - 1, day);

        if (Number.isNaN(date.getTime()) || year === 0 || month === 0 || day === 0) {
            throw new Error(`Invalid Date : ${value}`);
        }

        return date;
    }

    const date = new Date(trimmed);

    if (Number.isNaN(date.getTime())) {
        throw new Error(`Invalid Date : ${value}`);
    }

    return date;
};
