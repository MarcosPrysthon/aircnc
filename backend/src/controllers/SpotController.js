const Spot = require('../models/Spot');
const User = require('../models/User');
const errors = require('../err/ThrowEx');
 
//pegando todas as infos para criação 
//do spot, criando e retornando o spot
module.exports = {

    //listagem de spots por tecnologia
    async index(req, res){
        //pegando as techs da minha requisição
        //e achando os spots que usam ela
        const { tech } = req.query;
        const spots = await Spot.find({ techs: tech });

        return res.json(spots);
    },

    //criação de spots
    async store(req, res){
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        //verificando se o usuario existe do db
        const user = await User.findById(user_id);
        const eSpot = await Spot.findOne({ company });
        if(!user){
            return errors.nonexistentUserE(req, res);
        }

        const spot = await Spot.create({
            user: user_id,
            thumbnail: filename,
            company,
            price,
            //transformando string pra array e tirando os espaços 
            techs: techs.split(',').map(tech => tech.trim())
        })
        
       
        return res.json(spot);
        
    }
};