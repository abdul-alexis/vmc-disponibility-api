'use strict';
const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const cors = require('cors')
const fs = require('fs');
const path = require('path');
const jwt = require('jsonwebtoken');
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const options = {
    definition: {
        openapi: "3.0.0",
        info: {
            title: "Dash API",
            version: "1.0.0",
            description: "A API for  Voice Manager disponibility  ",
        },
        servers: [
            {
                url: process.env.SERVER_URL,
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: "http",
                    scheme: "bearer",
                },
            },
        },
    },
    apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

//aqui vão as variáveis de rotas
const route_status = require('./routes/route-status');
const route_event = require('./routes/route-event');
const route_user = require('./routes/route-user');
const route_entry = require('./routes/route-entry');



// const cors = require('cors')
app.use(morgan('common'));
app.use(bodyParser.urlencoded({ extended: false })); //apenas dados simples
app.use(bodyParser.json()); // apenas json de entrada no body

//Middlewares


//aplicando CORS
app.use(cors());

//aqui vão as rotas
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(specs));
app.use('/api/status', route_status);
app.use('/api/event', route_event);
app.use('/api', route_user);
app.use('/', route_entry)


app.use((req, res, next) => {
    res.header('Access-Control-Allow-Origin', '*');
    res.header('Access-Control-Allow-Header', 'Origin, X-Requested-With, Content-Type, Accept, Authorization,');

    if (req.method === 'OPTIONS') {
        res.header('Access-Control-Allow-Methods', "GET,POST,PUT,DELETE");
        return res.status(200).send({
            //retorna um objeto vazio
        });
    }
    next();

});

//quando não encontrar rota, entra aqui
app.use((req, res, next) => {
    const err = new Error('Não encontrado!');
    err.status = 404;

    next(err);

});


// handle error, print stacktrace
app.use((err, req, res, next) => {
    res.status(err.status || 500);
    res.json({ status: err.status, message: err.message });
});

module.exports = app;