const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
require('dotenv').config();

const app = express();

const PORT = process.env.PORT || 3001;
const DATABASE_URL = process.env.DATABASE_URL;

app.listen(PORT, () => {
    console.log(`Server running on ${PORT}`)
})

// Connect to MongoDB
mongoose.connect(process.env.DATABASE_URL, (err) => {
    if(err){
        console.error("Error: ", err.message);
    }
    else{
        console.log("MongoDB Connection Successful")
    }
});


