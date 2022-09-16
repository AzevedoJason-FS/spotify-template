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
    if (response.status === 200){

      //Store tokens in DB
      const newToken = new spotifyToken({
        access_token: response.data.access_token,
        refresh_token: response.data.refresh_token,
        expires_in: now + response.data.expires_in,
      });
    
      spotifyToken.find()
      .then(result => {
        if(result.length == 0){
          newToken.save()
          .then(result => {
              console.log(result);
              res.redirect(`http://localhost:3000/search`);
          })
        }else{
          //update the document already in the DB
          const filter = { _id: '6323e5d9ac4dc8c8e05c0f65' };
          const update = { access_token: response.data.access_token,
                           refresh_token: response.data.refresh_token,
                           expires_in: now + response.data.expires_in 
                          };
          
          spotifyToken.findOneAndUpdate(filter, update, {upsert: true})
          res.redirect(`http://localhost:3000/search`);
        }
      })
    }else{
      res.redirect(`/?${querystring.stringify({ error: 'invalid_token' })}`)
    }
  })
}

// const status = async (req, res) => {
//   req.token = await spotifyToken.findOne({ where: {} })
//   if (!accessToken || !timestamp) {
//     return false;
//   }
//   const millisecondsElapsed = Date.now() - Number(timestamp);
//   return (millisecondsElapsed / 1000) > Number(expireTime);
// };



// const refreshToken = async (req, res) => {
//   const { refresh_token } = req.query;
// BQCOcB0IgwI69jmHv-PrepVAjd3TmktlWVIfgtXies1x1C9rPOZ8caOMdJCFXG9L5vbkV1

//   axios({
//     method: 'post',
//     url: 'https://accounts.spotify.com/api/token',
//     data: querystring.stringify({
//       grant_type: 'refresh_token',
//       refresh_token: refresh_token
//     }),
//     headers: {
//       'content-type': 'application/x-www-form-urlencoded',
//       Authorization: `Basic ${new Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')}`,
//     },
//   })
//     .then(response => {
//       res.send(response.data);
//     })
//     .catch(error => {
//       res.send(error);
//     });
// };

module.exports = {
 login, callback,
}