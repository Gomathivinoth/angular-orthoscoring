const express = require('express');
const router = express.Router();
const app = express();

const mongoose = require('mongoose');
const config = require('./config/database');
const authentication = require('./routes/authentication')(router);
const bodyParser = require('body-parser');

mongoose.Promise = global.Promise;
mongoose.connect(config.uri, (err) => {
    if(err) {
        console.log('Could not connect to database: ', err);
    } else {
        console.log(config.secret);
        console.log('Connected to database: ' + config.db);
    }
});
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(express.static(__dirname + '/client/dist/'));
app.use('/authentication', authentication);

app.get('/', (req, res) => {
    res.send('<h1>Hello </h1>');
});

app.listen(8081, () => {
    console.log('Listening on port 8081');
});