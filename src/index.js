const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const routes = require('./routes');

const app = express();

mongoose.connect('mongodb+srv://kevinstone:kevinstone@cluster0-rzxze.mongodb.net/week10?retryWrites=true&w=majority',{
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

app.use(cors());
app.use(express.json());
app.use(routes);

// São metodos HTTP: get, post, put e delete
// Tipos de parametros:

// Query Params: request.query - Usados para: (Filtros, paginação, ordenação, ...).
// Route Params: request.params - Usados para: (Identificar um recurso  na alteração ou remoção).
// Body: request.body - Usado para: (Dados para a criação ou alteração de um registro).

//Banco de dados usado é o MongoDB. (Não-relacional) - Otimo para aplicações que não exija muito relacionamento.


app.listen(3333);