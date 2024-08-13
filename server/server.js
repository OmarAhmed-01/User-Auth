import express from 'express';
import cors from 'cors';
import mongoose from 'mongoose';
import connectDB from './config/config.js';
import UserModel from './models/usersModel.js';

const app = express()
const port = 3000

connectDB();

app.use(cors());
app.use(express.json());

// const User = mongoose.model('User', UserSchema);

app.post('/api/register', async (req, res) => {
    try {
        await UserModel.create({
            name: req.body.name,
            email: req.body.email,
            password: req.body.password,
        });
        res.json({status: 'ok'});
    } catch (error) {
        console.log(error.message);
        res.json({status: "error"});
    }
})

app.post("/api/login", async (req, res) => {
    const user = await UserModel.findOne({
        email: req.body.email,
        password: req.body.password,
    })
    if(user){
        return res.json({status: 'ok', user: true})
      }
      else{
        return res.json({status: 'error', user: false})
      }
});


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})