var express = require('express');
var path = require('path');
var cors = require('cors');
const axios = require('axios').default;
var cookieParser = require('cookie-parser');
var logger = require('morgan');

const apiUrl = "http://rdweb.spica.com:5213/timeapi/";

var app = express();
app.use(cors());

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

app.get('/api/*', async (req, res) => {
  var url = req.url;
  url = url.slice(4);
  console.log(url);
  try {
    const response = await axios.get(apiUrl + url, {headers: req.headers});
    res.status(response.status).json(response.data);
  } catch(error) {
    console.log(error);
    res.status(500).json({"msg": error});
  }
});

app.put('/api/*', async (req, res) => {
  var url = req.url;
  url = url.slice(4);
  console.log(url);
  try {
    const response = await axios.put(apiUrl + url, req.body, {headers: req.headers});
    res.status(response.status).json(response.data);
  } catch(error) {
    console.log(error);
    res.status(500).json({"msg": error});
  }
});

app.delete('/api/*', async (req, res) => {
  var url = req.url;
  url = url.slice(4);
  console.log(url);
  try {
    const response = await axios.delete(apiUrl + url, {headers: req.headers});
    res.status(response.status).json({"msg": "Success"});
  } catch(error) {
    console.log(error);
    res.status(500).json({"msg": error});
  }
});

module.exports = app;
