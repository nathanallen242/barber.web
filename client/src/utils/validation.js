export const errorMessages = {
    client_first_name: "This field is required",
    client_last_name: "This field is required",
    client_email: "Invalid E-mail",
    client_phone_number: "Invalid phone number"
};

export function isValidEmail(email) {
    const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(String(email).toLowerCase());
}

export function isValidPhoneNumber(phoneNumber) {
    const re = /^\+?[1-9]\d{1,14}$/;
    return re.test(phoneNumber);
}

export function isFutureDate(date) {
    const now = new Date();
    return date > now;
}
