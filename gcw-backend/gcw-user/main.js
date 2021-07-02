const express = require('express');
const app = express();
const userRoutes = require('./routers/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { MongoURL } = require('./URL');
const swaggerDocument = require('./swagger.json');
const swaggerUI = require('swagger-ui-express');
const cors = require('cors');

var PORT = process.env.PORT || 3005;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-user");
});
mongoose.Promise = global.Promise;

var corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*', // this work well to configure origin url in the server
    methods: ['GET', 'PUT', 'POST', 'DELETE', 'OPTIONS'], // to works well with web app, OPTIONS is required
    allowedHeaders: ['Content-Type', 'Authorization'] // allow json and token in the headers
};
app.use(cors(corsOpt)); // cors for all the routes of the application
app.options('*', cors(corsOpt));
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

app.use(cookieParser());

app.use(userRoutes);

app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send("Here's a Cookie");
})

app.listen(PORT, () => {
    console.log(`User Service Started at ${PORT}`);
});