// MustafaDemir-auctionSite/client/src/commonComponents/inputValidation.js

export function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

export function validatePassword(password) {
    return password && password.length >= 8;
}

export function validateUsername(username) {
    return username && username.trim() !== '';
}

export function validateConfirmPassword(password, confirmPassword) {
    return password === confirmPassword;
}

export function validateBidAmount(bidAmount) {
    return bidAmount && bidAmount > 0;
}

export function validateString(value) {
    return typeof value === 'string' && value.trim() !== '';
}

export function validateInteger(value) {
    return Number.isInteger(value) && value > 0;
}

export function validateDate(value) {
    return !isNaN(Date.parse(value));
}