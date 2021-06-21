const express = require('express');
const app = express();
const mongoose = require('mongoose');
const carsRoutes = require('./routers/cars');
const UserCarsRoutes = require('./routers/userCars');
const { MongoURL } = require('./URL');
const swaggerJsDoc = require('swagger-jsdoc');
const swaggerUi = require('swagger-ui-express');

var PORT = process.env.PORT || 3001;

const swaggerOptions = {
    definition: {
        info: {
            title: "APIs for Cars-service",
            description: "Cars-Service APIs",
            contact: {
                name: "Parag G."
            },
            servers: [{
                url: "http://localhost:3001"
            }]
        }
    },
    apis: ["./routers/*.js"]
};

const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use('/cars-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));
app.use('/userCars-api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocs));


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