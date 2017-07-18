const express = require('express');
const config = require('./config');
const bodyParser = require('body-parser');
const glob = require('glob');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(config.root + '/../client/dist'));

const controllers = glob.sync(config.root + '/controllers/*.js')
controllers.forEach(function(controller) {
    require(controller).init(app);   
});

app.listen(config.port, function() {
    console.log('App running on ' + config.root + ' ' + config.port);
});