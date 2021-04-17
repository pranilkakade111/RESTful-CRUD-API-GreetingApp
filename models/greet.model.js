const mongoose = require('mongoose');

const Greetschema = mongoose.Schema({
    UserName: String,
    GreetingMessage: String
}, {
    timestamps:true
});

module.exports = mongoose.model('Greet',Greetschema);