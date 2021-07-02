const express = require('express');
const app = express();
const userRoutes = require('./routers/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const { MongoURL } = require('./URL');

var PORT = process.env.PORT || 3005;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-user");
});
mongoose.Promise = global.Promise;

app.use(cookieParser());

app.use(userRoutes);

app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send("Here's a Cookie");
})

app.listen(PORT, () => {
    console.log(`User Service Started at ${PORT}`);
});