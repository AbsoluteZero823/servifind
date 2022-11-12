const express = require('express');
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload')

const app = express();

app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());

// const animals = require('./routes/animal');
const service = require('./routes/service');
const auth = require('./routes/auth');
// const order = require('./routes/order');
// app.use('/api/v1', products);
// app.use('/api/v1', auth);
// app.use('/api/v1', order);


// app.use('/api/v1', animals);
app.use('/api/v1', service);
app.use('/api/v1', auth);
app.use(errorMiddleware);

module.exports = app
