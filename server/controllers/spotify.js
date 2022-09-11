const express = require('express');
const querystring = require('querystring');
const spotify = express.Router();
const randomstring = require("randomstring");
require('dotenv').config();
const axios = require("axios");

const login = async (req, res) => {
  const state = randomstring.generate(16)
  const scope = 'user-read-private user-read-email';
  res.redirect(`${process.env.AUTH_ENDPOINT}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&state=${state}&scope=${scope}`)
};

const callback = async (req, res) => {

  const code = req.query.code || null;
  axios({
    method: 'post',
    url: 'https://accounts.spotify.com/api/token',
    data: querystring.stringify({
      grant_type: 'authorization_code',
      code: code,
      redirect_uri: process.env.REDIRECT_URI
    }),
    headers: {
      'content-type': 'application/x-www-form-urlencoded',
      Authorization: `Basic ${new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
    },
  })
  .then(response => {
    if (response.status === 200) {
      res.send(`<pre>${JSON.stringify(response.data, null, 2)}</pre>`);
    } else {
      res.send(response);
    }
  })
  .catch(error => {
    res.send(error);
  });
  }

module.exports = {
 login, callback
}