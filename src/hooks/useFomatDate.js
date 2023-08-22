export const useFormatDate = (date) => {
    return new Intl.DateTimeFormat("en", {
        day: "numeric",
        month: "long",
        year: "numeric"
    }).format(new Date(date))
}