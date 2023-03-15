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
const inquiry = require('./routes/inquiry');
const transaction = require('./routes/transaction');
const freelancer = require('./routes/freelancer');
const rating = require('./routes/rating');
const report = require('./routes/report');
// const message = require('./routes/message');
// app.use('/api/v1', products);
// app.use('/api/v1', auth);
// app.use('/api/v1', order);


// app.use('/api/v1', message);
app.use('/api/v1', service);
app.use('/api/v1', auth);
app.use('/api/v1', inquiry);
app.use('/api/v1', transaction);
app.use('/api/v1', freelancer);
app.use('/api/v1', rating);
app.use('/api/v1', report);
app.use(errorMiddleware);

module.exports = app
