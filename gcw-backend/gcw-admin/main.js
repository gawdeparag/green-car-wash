const express = require('express');
const app = express();
const adminRoutes = require('./routers/admin');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { MongoURL } = require('./URL');
const { requireAuth, checkUser } = require('./middleware/adminAuthMiddleware');
const cors = require('cors');

var PORT = process.env.PORT || 3000;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-admin");
});
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.get('/profile', requireAuth, (req, res) => { res.render('profile') });
app.use(adminRoutes);

var corsOpt = {
    origin: process.env.CORS_ALLOW_ORIGIN || '*',
    methods: ['GET', 'PUT', 'POST', 'DELETE'],
    allowedHeaders: ['Content-Type', 'Authorization']
};
app.use(cors(corsOpt));
app.options('*', cors(corsOpt));

app.listen(PORT, () => {
    console.log(`Admin Service Started at ${PORT}`);
    app.get("/", (req, res) => {
        res.send("NGINX API Gateway connected successfully");
    });
});