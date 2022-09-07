const express = require('express');
const spotify = express.Router();
require('dotenv').config();

spotify.get("/", (req, res, next) => {
  res.redirect(`${process.env.AUTH_ENDPOINT}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}`)
});


module.exports = spotify;




