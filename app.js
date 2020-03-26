const express = require('express');
const mongoose = require('mongoose');


const bodyParser = require('body-parser');
const morgan = require('morgan');

const cors = require('cors');
const http = require('http');

const app = express();

//Connect to db

const Config = require('./config/config');

mongoose.Promise = global.Promise;

//Connecting to the database

mongoose.connect(Config.url)
    .then((data) => {
        // console.log(data);
        console.log("Successfully connected to MongoDB.");
    }).catch(err => {
        console.log('Could not connect to MongoDB.');
        process.exit();
    });

const bookRoutes = require('./api/routes/book');
const userRoutes = require('./api/routes/user');
const adminRoutes = require('./api/routes/admin');

//Initailiaze app

const PORT = process.env.PORT || 4000;

// Creating a Server
const server = http.createServer(app);

// Start Server using environment port
server.listen(PORT, (data) => {
    console.log(data);
    console.info('Server is running on ' + PORT)
});


// mongo configuration
mongoose.set('useCreateIndex', true);
mongoose.set('useNewUrlParser', true);
mongoose.set('useUnifiedTopology', true);
mongoose.set('useFindAndModify', true);

// defining the Middleware
app.use(cors());

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())

app.use(morgan('dev'))

//routes
app.use("/book",bookRoutes);
app.use("/user",userRoutes);
app.use("/admin",adminRoutes);




