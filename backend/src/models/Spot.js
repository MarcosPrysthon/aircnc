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
}, {
    toJSON: {
        virtuals: true,
    }
});

//jogando a url da imagem para o res da req
SpotSchema.virtual('thumbnail_url').get(function(){
    return `http://localhost:3333/files/${this.thumbnail}`

});

module.exports = mongoose.model('Spot', SpotSchema);