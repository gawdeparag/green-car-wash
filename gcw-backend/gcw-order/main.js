const express = require('express');
const app = express();
const mongoose = require('mongoose');
const orderRoutes = require('./routers/order');
const { MongoURL } = require('./URL');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');

var PORT = process.env.PORT || 3002;

app.use('/order-api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-order");
});
mongoose.Promise = global.Promise;

app.use('/order', orderRoutes);

app.listen(PORT, () => {
    console.log(`Order Service Started at ${PORT}`);
});