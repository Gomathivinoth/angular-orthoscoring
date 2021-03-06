const mongoose = require('mongoose');
mongoose.Promise = global.Promise;
const bcrypt = require('bcrypt-nodejs');

let emailLengthChecker = (email) => {
    if(!email){
        return false;
    } else {
        if(email.length < 5 || email.length > 30){
            return false;
        } else {
            return true;
        }
    }
};

let validEmailChecker = (email) => {
    if(!email){
        return false;
    } else {
        const regExp = new RegExp(/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
        return regExp.test(email);
    }
};

const emailValidators=[{
    validator:emailLengthChecker,
    message:'E-mail must be atleast 5 characters but not more than 30'
},
{
    validator:validEmailChecker,
    message:'Must be valid email'
}];

const Schema = mongoose.Schema;
const userSchema = new Schema({
    email: { type: String, required: true, unique: true, lowercase: true, validate: emailValidators },
    username: { type: String, required: true, unique: true, lowercase: true },
    password: { type: String, required: true }
});

userSchema.pre('save', function(next){
if(!this.isModified('password'))
    return next();

bcrypt.hash(this.password, null, null, (err, hash) => {
    if(err)
        return next(err);
         this.password = hash;
         next();

});
});

module.exports = mongoose.model('User', userSchema);