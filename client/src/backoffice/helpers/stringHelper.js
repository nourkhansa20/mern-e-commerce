export function formatString(str) {
    // Replace underscores with spaces
    str = str.replace(/_/g, ' ');

    // Add a space before each uppercase letter and capitalize the first letter
    return str.replace(/([A-Z])/g, ' $1').replace(/^./, function (match) {
        return match.toUpperCase();
    }).trim();
}