const User = require('../models/User');
const errors = require('../err/ThrowEx');

module.exports = {
    
    async index(req, res){
        const { email } = req.body;
        let user = await User.findOne({ email });
        
        if(!user){
            return errors.nonexistentUserE(req, res);
        }

        return res.json(user);
    },

    async store(req, res){

        let { email } = req.body;
        let user = await User.findOne({ email });
       
        if(!user){
            user = await User.create({ email });
        } 
       
        //retornando o objeto do usuario
        return res.json(user);
    }

};