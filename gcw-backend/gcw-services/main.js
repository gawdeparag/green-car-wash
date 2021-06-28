const express = require('express');
const app = express();
const mongoose = require('mongoose');
const servicesRoutes = require('./routers/services');
const addOnRoutes = require('./routers/addOns');
const { MongoURL } = require('./URL');
const swaggerDocument = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');

var PORT = process.env.PORT || 3004;

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