const Spot = require('../models/Spot');
const User = require('../models/User');
 
//pegando todas as infos para criação 
//do spot, criando e retornando o spot
module.exports = {
    async store(req, res){
        const { filename } = req.file;
        const { company, price, techs } = req.body;
        const { user_id } = req.headers;

        //verificando se o usuario existe do db
        const user = await User.findById(user_id);
        if(!user){
            return res.status(400).json({ err: "user does not exist" });
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