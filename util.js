export function containNumber(text) {
    return /\d/.test(text)
}
export function extractOnlyNumber(text) {
    return text.replace(/\D/g, '')
}

export function extractOnlyLetters(text) {
    return text.replace(/[^a-zA-Z]/g, '')
}

export function isNumber(string) {
    return /^[0-9]*$/.test(string);
}