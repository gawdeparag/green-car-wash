const express = require('express');
const app = express();
const mongoose = require('mongoose');
const carsRoutes = require('./routers/cars');
const UserCarsRoutes = require('./routers/userCars');
const { MongoURL } = require('./URL');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var PORT = process.env.PORT || 3001;

app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.set('view engine', 'ejs');

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-cars");
});
mongoose.Promise = global.Promise;

app.use('/cars', carsRoutes);
app.use('/user-cars', UserCarsRoutes);

app.listen(PORT, () => {
    console.log(`Cars Service Started at ${PORT}`);
});