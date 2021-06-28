const express = require('express');
const app = express();
const userRoutes = require('./routers/user');
const mongoose = require('mongoose');
const cookieParser = require('cookie-parser');
const path = require('path');
const { MongoURL } = require('./URL');
const { requireAuth, checkUser } = require('./middleware/userMiddleware');

var PORT = process.env.PORT || 3005;

mongoose.connect(MongoURL, () => {
    console.log("Connected to DB gwc-user");
});
mongoose.Promise = global.Promise;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(cookieParser());

app.get('/profile', requireAuth, (req, res) => res.render('profile'));
app.get('*', checkUser);
app.get('/logout', checkUser, (req, res) => res.render('logout'));
app.use(userRoutes);

app.get('/set-cookies', (req, res) => {
    res.cookie('newUser', true, { maxAge: 1000 * 60 * 60 * 24, httpOnly: true });
    res.send("Here's a Cookie");
})

app.listen(PORT, () => {
    console.log(`User Service Started at ${PORT}`);
});