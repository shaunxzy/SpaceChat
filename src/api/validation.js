export const EmailValidation = email => {
    return /^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$/.test(email)
}


//Receive a string, password,
//Return true if the password has a length over 6 chars, contains at least one number, contains at least one symbol and
// does not contain ?/\"'.
export const PasswordValidation = (pswd) => {
    if (pswd === undefined){
        return []
    }


    const length = pswd.length > 6;
    const containNumber = /\d/.test(pswd)
    const notContain = !(/[\/\\'"]/.test(pswd))

    const pswMap = [
        {valid: length, message: "password must contain at least 6 characters"},
        {valid: containNumber, message: "password must contain at least 1 number"},
        {valid: notContain, message: "password must not contain \'\"?/\\"},
    ]

    return pswMap.filter(item => {return !item.valid})
}