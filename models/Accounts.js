const { Schema , model } = require('mongoose');

const accountSchema = new Schema({
    type: {
        type: String,
    },
    email: {
        type: String,
    },
    password: {
        type: String,
    },
    price: {
        type: Number,
    }
})



module.exports = model('Account', accountSchema);
