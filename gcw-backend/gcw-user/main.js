const express = require('express');
const app = express();
const userRoutes = require('./routers/user');
const mongoose = require('mongoose');

var PORT = process.env.PORT || 3005;

mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-user?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-user");
});
mongoose.Promise = global.Promise;

app.use(userRoutes);

app.listen(PORT, () => {
    console.log(`User Service Started at ${PORT}`);
});