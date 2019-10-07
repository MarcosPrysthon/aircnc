const User = require('../models/User');

module.exports = {
   async store(req, res){
       //pegando o email do body da requisiçao
       let { email } = req.body;
       //vendo se ja existe um user com o email
       let user = await User.findOne({ email });
       //criando o usuario se ja nao existe
       if(!user){
           user = await User.create({ email });
       }
       
       //retornando o objeto do usuario
       return res.json(user);
    }

};