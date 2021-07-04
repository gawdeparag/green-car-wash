const express = require('express');
const app = express();
const mongoose = require('mongoose');
const servicesRoutes = require('./routers/services');
const addOnRoutes = require('./routers/addOns');
const { MongoURL } = require('./URL');
const swaggerDocument = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const cookieParser = require('cookie-parser');
const cors = require('cors');

var PORT = process.env.PORT || 3004;
var corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt));

app.use(cookieParser());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-services");
});
mongoose.Promise = global.Promise;

app.use('/service', servicesRoutes);
app.use('/add-on', addOnRoutes);

app.listen(PORT, () => {
    console.log(`Services Started at ${PORT}`);
});

module.exports = app;