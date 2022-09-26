const spotifyToken = require("../models/spotifyToken");
const querystring = require('node:querystring');
require('dotenv').config();
const axios = require("axios");

const now = new Date().getTime()

const login = async (req, res) => {
  const scope = 'user-read-private user-read-email';
  res.redirect(`${process.env.AUTH_ENDPOINT}?client_id=${process.env.CLIENT_ID}&redirect_uri=${process.env.REDIRECT_URI}&response_type=${process.env.RESPONSE_TYPE}&scope=${scope}`)
};

const callback = async (req, res) => {
  const code = req.query.code || null;

  await spotifyToken.findOne()
  .then(token => {
  if(token && now < token.expires_in){
    res.redirect(`http://localhost:3000/search`);
  }
  if(!token && code){
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
        //Store tokens in DB
        const newToken = new spotifyToken({
          access_token: response.data.access_token,
          refresh_token: response.data.refresh_token,
          expires_in: now + response.data.expires_in,
        });
  
        newToken.save()
        .then(save => {
          res.redirect(`http://localhost:3000/search`);
        })
    })
  }
  if(token && now > token.expires_in){
    axios({
      method: 'post',
      url: 'https://accounts.spotify.com/api/token',
      data: querystring.stringify({
        grant_type: 'refresh_token',
        refresh_token: token.refresh_token
      }),
      headers: {
        'content-type': 'application/x-www-form-urlencoded',
        Authorization: `Basic ${new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
      },
    })
    .then(response => {
        //update the document already in the DB
        const filter = { _id: token._id };
        const update = { access_token: response.data.access_token,
                         expires_in: now + response.data.expires_in 
                       };
        spotifyToken.findOneAndUpdate(filter, update, {upsert: true},( error, result) => {
           res.redirect(`http://localhost:3000/search`);
        })
    })
    .catch(err => {
      console.error(err.message);
      res.status(500).json({
          error: {
              message: err.message
          }
      })
    });
  }
 })
}

const status = async (req, res) => {
  await spotifyToken.findOne()
  .then(token => {
    if(token){
      const valid = (token.expires_in > now) ? true : false
      res.json({ valid })
    }
    else if(!token){
      res.redirect(`http://localhost:3000/`);
    }
  })
};

const topTracks = async (req,res) => {
  const id = req.params.id
  await spotifyToken.findOne()
  .then(token => {
    if(token){
      axios.get(
        `https://api.spotify.com/v1/artists/${id}/top-tracks?market=US`, {
            headers: {
                Accept: 'application/json',
                Authorization: 'Bearer ' + token.access_token,
                'Content-Type': 'application/json',
            },
        })
  .then((response) => {
    res.send(response.data)
  })
  .catch(err => {
    res.send(err)
  })
  }else if(!token){
    res.redirect(`http://localhost:3000/`);
  }
  })
}

const artist = async (req,res) => {
  const id = req.params.id
  await spotifyToken.findOne()
  .then(token => {
    if(token){
  axios.get(
    `https://api.spotify.com/v1/artists/${id}`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token.access_token,
            'Content-Type': 'application/json',
        },
    })
  .then((response) => {
    res.send(response.data)
  })
  .catch(err => {
    res.send(err)
  })
}else if(!token){
  res.redirect(`http://localhost:3000/`);
}
  })
}

const album = async (req,res) => {
  const id = req.params.id
  await spotifyToken.findOne()
  .then(token => {
    if(token){
  axios.get(
    `https://api.spotify.com/v1/albums/${id}/tracks?market=US&limit=10`, {
        headers: {
            Accept: 'application/json',
            Authorization: 'Bearer ' + token.access_token,
            'Content-Type': 'application/json',
        },
    })
  .then((response) => {
    res.send(response.data)
  })
  .catch(err => {
    res.send(err)
  })
}else if(!token){
  res.redirect(`http://localhost:3000/`);
}
  })
}


module.exports = {
 login, callback, status, topTracks, artist, album
}