const express = require('express');
const mongoose = require('mongoose'); 
const path = require('path');
const cors = require('cors');

const routes = require('./routes');

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
//pegar imagens a partir da thumbnail_url
app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')));
app.use(routes)

app.listen(3333);