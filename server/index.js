const express = require('express');
const mongoose = require('mongoose');

const connectDB = async () => {
    const db = mongoose.connect('mongodb://localhost:27017/test', { useNewUrlParser: true });
    
}

const app = express();

app.get('/', (req, res) => {res.send("hello world")})

const PORT =  5000;

app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`);});
