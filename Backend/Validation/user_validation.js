const mobileNoPattern = /^(\+94|0)(7\d{8})$/;
const nicPattern = /^([0-9]{9}[x|X|v|V]|[0-9]{12})$/;
const emailPattern = /[a-zA-Z0-9]+@[a-zA-Z]+\.[a-zA-Z]{2,3}/;
// const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;

const pwdPattern = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[!@#$%^&*]).{8,}$/;
const checkingMobileValidation = (mobile) => {
  return mobileNoPattern.test(mobile)
}

const nicValidation = (nic) => {
  return nicPattern.test(nic)
}

const validateEmail = (email) => {
  return emailPattern.test(email);
};

const validatePWD = (pwd) => {
  return pwdPattern.test(pwd);
};


exports.checkingMobileValidation = checkingMobileValidation;
exports.nicValidation = nicValidation
exports.validateEmail = validateEmail
exports.validatePWD = validatePWD