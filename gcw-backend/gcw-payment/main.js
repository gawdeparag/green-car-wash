const express = require('express');
const app = express();
const mongoose = require('mongoose');
const paymentRoutes = require('./routers/payment');
const swaggerUI = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cookieParser = require('cookie-parser');

var PORT = process.env.PORT || 3003;

app.use(cookieParser());
app.use('/api-docs', swaggerUI.serve, swaggerUI.setup(swaggerDocument));

mongoose.connect('mongodb+srv://paragg:paragg@cluster0.0nwkr.mongodb.net/gcw-payment?retryWrites=true&w=majority', () => {
    console.log("Connected to DB gwc-payment");
});
mongoose.Promise = global.Promise;

app.use(paymentRoutes);

app.listen(PORT, () => {
    console.log(`Payment Service Started at ${PORT}`);
});

module.exports = { app: app, router: paymentRoutes }