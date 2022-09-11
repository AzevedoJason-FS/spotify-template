const mongoose = require("mongoose");

const spotifyTokenSchema = mongoose.Schema({
    access_token: {
        type: String,
    },
    token_type:{
        type: String
    },
    expires_in:{
        type: String
    },
});

module.exports = mongoose.model("SpotifyToken", spotifyTokenSchema);
