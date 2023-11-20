const mongoose = require('mongoose')
const { isEmail } = require('validator')
var AutoIncrement = require('mongoose-sequence')(mongoose);

const userSchema = mongoose.Schema({
    userId: {
        type: Number,
        required: true
    },
    name: {
        type: String,
        required: true
    },
    user_email: {
        type: String,
        required: [true, 'Email is required'],
        validate: {
            validator: isEmail,
            message: props => `${props.value} is not a valid email`
        }
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        validate: {
            validator: function (value) {
                return value.length >= 6
            },
            message: props => `Password must be at least six characters long`
        }
    },
    phone: {
        type: String,
        required: true
    },
    detail: {
        type: mongoose.SchemaTypes.ObjectId,
        ref: 'Detail'
    }
});

userSchema.plugin(AutoIncrement, {inc_field: 'userId'});

module.exports = mongoose.model('UserTable', userSchema, 'usertable');