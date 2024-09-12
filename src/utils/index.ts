export const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toDateString().split(" ").slice(1, 4).join(" ");
};

export const truncateText = (text: string, wordLimit: number) => {
    const words = text.split(" ");
    if (words.length > wordLimit) {
        return words.slice(0, wordLimit).join(" ") + "...";
    }
    return text;
};

export const getFirstLetter = (word: string) => {
    const firstLetter = word
        .split(" ")
        .map((el) => el[0])
        .join("");

    return firstLetter;
};
