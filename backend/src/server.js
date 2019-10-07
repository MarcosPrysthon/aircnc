//importando o express para a api
const express = require('express');
//importando o mongoose
const mongoose = require('mongoose'); 
//importanto as rotas do backend
const routes = require('./routes');

//criação da aplicação
const app = express();

//conectando com o banco de dados
mongoose.connect('mongodb+srv://prysthon1:marcosvinicius1@cluster0-knlvz.mongodb.net/semana09?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}) 

//lendo requisiçoes post como json
app.use(express.json());
app.use(routes)

app.listen(3333);