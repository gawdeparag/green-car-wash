const express = require('express');
const app = express();
const washerRoutes = require('./routers/washer');
const mongoose = require('mongoose');

var PORT = process.env.PORT || 3006;

mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-washer?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-washer");
});
mongoose.Promise = global.Promise;

app.use(washerRoutes);

app.listen(PORT, () => {
    console.log(`Washer Service Started at ${PORT}`);
});