const mongoose = require('mongoose');

//esquema do que os spots terão
//terão
const SpotSchema = new mongoose.Schema({
    thumbnail: String,
    company: String,
    price: Number,
    techs: [String],
    user: {
        //tipo dos usuarios que cadastrarão os spots
        type: mongoose.Schema.Types.ObjectId,
        //modulo do usuario
        ref: "User"
    }
});

module.exports = mongoose.model('Spot', SpotSchema);