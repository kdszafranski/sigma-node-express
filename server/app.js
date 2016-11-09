// node/express application
var express = require('express');
var app = express();
var path = require('path');
var bodyParser = require('body-parser');
var validation = require('./modules/validation');

// puts post request body data and store it on req.body
app.use(bodyParser.urlencoded({extended: true}));

app.set('port', process.env.PORT || 3000);

// Our song data
var songs = [
  {
    artist: "The Beatles",
    title: "Help",
    dateAdded: new Date().toLocaleDateString(),
  }
];

// Routes
app.post('/songs', function(req, res) {
  // req.body is supplied by bodyParser above
  console.log("REQ body: ", req.body);
  var newSong = req.body;

  // check empty stuff
  var empty = validation.checkEmpty(newSong);

  // check duplicates
  var duplicate = validation.checkDuplicate(songs, newSong);

  // send response
  if(empty || duplicate) {
    console.log('bad');
    res.status(400).send('some stuff');

  } else {
    // created new resource
    console.log('good');

    newSong.dateAdded = new Date();
    console.log(newSong.dateAdded);
    newSong.dateAdded = newSong.dateAdded.toLocaleDateString();
    console.log('locale: ', newSong.dateAdded);

    songs.push(newSong);
    res.sendStatus(201);
  }
});

app.get('/songs', function(req, res) {
  console.log('handling get request for songs');
  // response options
  // res.sendStatus(200);
  res.send(songs);
});

// static file routing
app.get('/*', function(req, res) {
  var file = req.params[0] || '/views/index.html';
  console.log(file);

  res.sendFile(path.join(__dirname, './public/', file));
  // /public/views/index.html
});

app.listen(app.get('port'), function() {
  console.log('Server is listening on port ' + app.get('port'));
});
