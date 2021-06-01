var news = require('./news');
var express = require('express');
var createError = require('http-errors')
const cors = require('cors');

var app = express();
app.use(cors());



app.use('/news', news);

app.use(function (req, res, next) {
  next(createError(404));
});

app.listen(8080, function() {
    console.log("Server is listening at http://localhost:8080")
});