require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const app = express();

app.use(express.json());

const userRouter = require('./routes/auth')

const connectDB = async () => {
    try {
        await mongoose.connect('mongodb://localhost:27017/ChuyenDeThucTap', { 
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
        console.log("Mongodb: connected")
    }
    catch (e) { 
        console.log(e);
        process.exit(1);
    }
}

connectDB()


app.use('/users', userRouter);

const PORT =  5000;

app.listen(PORT, () => {console.log(`Server is listening on port ${PORT}`);});
