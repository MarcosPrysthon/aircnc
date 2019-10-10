const mongoose = require('mongoose');

//esquema do que os usuarios terão
//no meu banco de dados
const UserSchema = new mongoose.Schema({
    email: String,
});

module.exports = mongoose.model('User', UserSchema);