const validator = require('validator');


module.exports = {
    createUser({ userInput }, req) {
        const errors = [];
        if(!validator.isEmail(userInput.email)) {
            errors.push({message: 'Email is invalid.'});
        }
        if(validator.isEmpty(userInput.password) || !validator.isLength(userInput.password, {min: 5})) {
            errors.push({message: 'Password too short!'});
        }
        if(errors.length > 0) {
            const error = new Error('Invalid input.');
            error.data = errors;
            error.code = 422;
            throw error;
        }



        const email = userInput.email;
        const name = userInput.name;
        const password = userInput.password;
        const user = {
            _id: Math.random().toString(),
            email: email,
            name: name,
            password: password
        }
        return user
    }
}