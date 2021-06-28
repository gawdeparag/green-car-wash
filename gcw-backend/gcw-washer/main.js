const express = require('express');
const app = express();
const washerRoutes = require('./routers/washer');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { MongoURL } = require('./URL');
const { requireAuth, checkUser } = require('./middleware/washerAuthMiddleware');
const cors = require('cors');

var PORT = process.env.PORT || 3006;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-washer");
});
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.get('/profile', requireAuth, (req, res) => { res.render('profile') });
app.use(washerRoutes);

var corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOpt));
app.options('*', cors(corsOpt));

app.listen(PORT, () => {
    console.log(`Washer Service Started at ${PORT}`);
    app.get("/", (req, res) => {
        res.send("NGINX API Gateway connected successfully");
    });
});