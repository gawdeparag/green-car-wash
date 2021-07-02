const express = require('express');
const app = express();
const mongoose = require('mongoose');
const carsRoutes = require('./routers/cars');
const userCarsRoutes = require('./routers/userCars');
const { MongoURL } = require('./URL');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');
const cors = require('cors');

var PORT = process.env.PORT || 3001;

app.use(cookieParser());
var corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt));
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-cars");
});
mongoose.Promise = global.Promise;

app.use(carsRoutes);
app.use('/user-cars', userCarsRoutes);

app.listen(PORT, () => {
    console.log(`Cars Service Started at ${PORT}`);
});