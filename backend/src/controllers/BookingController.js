const Booking = require('../models/Booking');

module.exports = {

    //fazendo uma nova reserva 
    async store(req, res){
        //pegando dados para criação da reserva
        const { user_id } = req.headers;
        const { spot_id } = req.params;
        const { date } = req.body;

        const booking = await Booking.create({
            user: user_id,
            spot: spot_id,
            date
        });

        return res.json(booking);
    }
}