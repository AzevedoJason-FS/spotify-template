const express = require('express');
const queryString = require("node:querystring");
const spotify = express.Router();
const randomstring = require("randomstring");
require('dotenv').config();
const axios = require("axios");

const login = async (req, res) => {
  const state = randomstring.generate(16)
  const scope = 'user-read-private user-read-email';
  res.redirect(`${process.env.AUTH_ENDPOINT}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&state=${state}&scope=${scope}`)
};

const search = async (req, res) => {
    const code = req.query.code;
    // const authOptions = {
    //   url: 'https://accounts.spotify.com/api/token',
    //   form: {
    //     code: code,
    //     redirect_uri: process.env.REDIRECT_URI,
    //     grant_type: 'authorization_code'
    //   },
    //   headers: {
    //     'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64'))
    //   },
    //   json: true
    // }

    const spotifyResponse = await axios.post(
      "https://accounts.spotify.com/api/token",
      queryString.stringify({
        grant_type: "authorization_code",
        code: code,
        redirect_uri: process.env.REDIRECT_URI,
      }),
      {
        headers: {
          'Authorization': 'Basic ' + (Buffer.from(process.env.CLIENT_ID + ':' + process.env.CLIENT_SECRET).toString('base64')),
          "Content-Type": "application/x-www-form-urlencoded",
        },
      }
    );
  
  console.log(spotifyResponse.data);

  
};


module.exports = {
	search, login
}







