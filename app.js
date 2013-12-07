var restify = require('restify');
var mongoose = require('mongoose');
var server = restify.createServer({
    name : "games"
});

server.use(restify.queryParser());
server.use(restify.bodyParser());
server.use(restify.CORS());
mongoose.connect('mongodb://localhost/games');

// set up the RESTful API, handler methods are defined in api.js
var api = require('./controllers/api.js');
var loader = require('./controllers/loader.js');
server.get('/', api.index);
server.post('/sendStat', api.sendStat);
server.get('/getStats/:username', api.getStats);
server.get('/getLeaderBoard/:name', api.getLeaderBoard);
server.get('/loadData', loader.loadData);

var ip_addr = '127.0.0.1';
var port    =  '3000';

server.listen(port ,ip_addr, function(){
    console.log('%s listening at %s ', server.name , server.url);
});


