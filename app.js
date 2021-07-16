var express = require('express');
var path = require('path');
var cors = require('cors');
const axios = require('axios').default;
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const apiUrl = "http://rdweb.spica.com:5213/";

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/*', async (req, res) => {
  var url = req.url;
  url = url.slice(5);
  console.log(url);
  try {
    const response = await axios.get(apiUrl + url, {headers: {"Authorization": req.headers.authorization}});
    res.status(response.status).json(response.data);
  } catch(error) {
    console.log(error);
    res.status(500).json({"msg": error.message});
  }
});

app.put('/api/*', async (req, res) => {
  var url = req.url;
  url = url.slice(5);
  console.log(url);
  try {
    const response = await axios.put(apiUrl + url, req.body, {headers: {"Authorization": req.headers.authorization}});
    res.status(response.status).json(response.data);
  } catch(error) {
    console.log(error);
    res.status(500).json({"msg": error.message});
  }
});

app.delete('/api/*', async (req, res) => {
  var url = req.url;
  url = url.slice(5);
  console.log(url);
  try {
    const response = await axios.delete(apiUrl + url, {headers: {"Authorization": req.headers.authorization}});
    res.status(response.status).json({"msg": "Success"});
  } catch(error) {
    console.log(error);
    res.status(500).json({"msg": error.message});
  }
});

app.use(express.static(path.join(__dirname, 'spicaApp', 'build')));
app.get(['', '/', '/employees', '/settings', '/presence'], (req, res, next) => {
  res.sendFile(path.join(__dirname, 'spicaApp', 'build', 'index.html'));
});

module.exports = app;
