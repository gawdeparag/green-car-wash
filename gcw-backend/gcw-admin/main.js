const express = require('express');
const app = express();
const adminRoutes = require('./routers/admin');
const mongoose = require('mongoose');

var PORT = process.env.PORT || 3000;

mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-admin?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-admin");
});
mongoose.Promise = global.Promise;

app.use(adminRoutes);

app.listen(PORT, () => {
    console.log(`Admin Service started at ${PORT}`);
});