module.exports = {

  existentUserE(req, res){
    res.status(400).json({ err: "User already exists" });
  },

  nonexistentUserE(req, res){
      res.status(400).json({ err: "User does not exist" });
  },

  existentSpotInUserE(req, res){
    res.status(400).json({ err: "User has already registered this spot" });
  }

};