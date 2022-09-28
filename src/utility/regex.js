const phoneRegex = /^[6-9]{1}[0-9]{9}$/;
const aadharRegex = /^[2-9]{1}[0-9]{3}[0-9]{4}[0-9]{4}$/;
const panRegex = /^([a-zA-Z]){5}([0-9]){4}([a-zA-Z]){1}$/;
const bankAccountNumberRegex = /^\d{9,18}$/;

const regex = { phoneRegex, aadharRegex, panRegex, bankAccountNumberRegex };
export default regex;
