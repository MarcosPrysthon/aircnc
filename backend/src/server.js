const express = require('express');
const mongoose = require('mongoose'); 
const routes = require('./routes');
const cors = require('cors');

//criação da aplicação
const app = express();

//conectando com o banco de dados
mongoose.connect('mongodb+srv://prysthon1:marcosvinicius1@cluster0-knlvz.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

app.use(cors());
//lendo requisiçoes post como json
app.use(express.json());
app.use(routes)

app.listen(3333);