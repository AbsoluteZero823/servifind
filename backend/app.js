require("dotenv").config();
const express = require('express');
const app = express();
const cookieParser = require('cookie-parser')
const errorMiddleware = require('./middlewares/errors');
const fileUpload = require('express-fileupload')

// const passport = require("passport");
const cookieSession = require("cookie-session");
// const passportStrategy = require("./passport");
const cors = require("cors")
const path = require('path')



const service = require('./routes/service');
const auth = require('./routes/auth');
const inquiry = require('./routes/inquiry');
const transaction = require('./routes/transaction');
const freelancer = require('./routes/freelancer');
const rating = require('./routes/rating');
const report = require('./routes/report');
const request = require('./routes/request');
const category = require('./routes/category');
const offer = require('./routes/offer');
const chat = require('./routes/chat');
const message = require('./routes/message');





// REQUIRED FOR UPLOADING LARGE IMAGE
// app.use(express.json({ limit: '10mb' }));
// app.use(express.urlencoded({ limit: '10mb' }));
app.use(express.json());



// app.use(express.json());
app.use(cookieParser());

app.use(express.urlencoded({ extended: true }));
app.use(fileUpload());


app.use(
    cookieSession({
        name: "session",
        keys: ["keySession"],
        maxAge: 24 * 60 * 60 * 100,
    })
);


// app.use(passport.initialize());
// app.use(passport.session());

app.use(
    cors({
        origin: "http://localhost:3000",
        methods: "GET,POST,PUT,DELETE",
        credentials: true,
    })
);



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
app.use('/api/v1', request);
app.use('/api/v1', category);
app.use('/api/v1', offer);
app.use('/api/v1', chat);
app.use('/api/v1', message);




const __dirname1 = path.resolve();


if (process.env.NODE_ENV === 'PRODUCTION') {

    // require('dotenv').config({ path: 'backend/config/config.env' })
    app.use(express.static(path.join(__dirname1, '/frontend/build')))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname1, "frontend", "build", "index.html"))
    })
} else {
    app.get("/", (req, res) => {
        res.send("API is Running Successfully");
    })
}






app.use(errorMiddleware);

module.exports = app
