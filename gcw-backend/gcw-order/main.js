const express = require('express');
const app = express();
const mongoose = require('mongoose');
const orderRoutes = require('./routers/order');
const { MongoURL } = require('./URL');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');
const cors = require('cors');

var PORT = process.env.PORT || 3002;

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
    console.log("Connected to DB gwc-order");
});
mongoose.Promise = global.Promise;

app.use(orderRoutes);

app.listen(PORT, () => {
    console.log(`Order Service Started at ${PORT}`);
});