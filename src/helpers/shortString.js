export let shortString = (string, length) => {
    return string.length > length
        ? string.substring(0, length - 3) + '...'
        : string;
};
export default shortString;
