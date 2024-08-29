export const formatDate = (date: string) => {
    const d = new Date(date);
    return d.toDateString().split(" ").slice(1, 4).join(" ");
};