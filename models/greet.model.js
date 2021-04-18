const mongoose = require('mongoose');

const GreetSchema = mongoose.Schema({
    UserName: String,
    GreetingMessage: String
}, {
    timestamps:true
});

module.exports = mongoose.model('Greet',GreetSchema);
