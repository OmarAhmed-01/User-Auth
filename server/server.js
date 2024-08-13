import express from 'express';
import cors from 'cors';
import connectDB from './config/config.js';
import UserModel from './models/usersModel.js';
import jwt from 'jsonwebtoken';

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
        const token = jwt.sign({
            email: user.email,
            name: user.name,
        }, 'secret123');
        return res.json({status: 'ok', user: token})
    }
    else{
    return res.json({status: 'error', user: false})
    }
});

app.get('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await UserModel.findOne({ email: email});

        return res.json({ status: 'ok', quote: user.quote});
    } catch (error) {
        console.log(error);
        res.json({status: "error", error: "Invalid token"})
    }
});

app.post('/api/quote', async (req, res) => {

    const token = req.headers['x-access-token'];

    try {
        const decoded = jwt.verify(token, 'secret123');
        const email = decoded.email;
        const user = await UserModel.updateOne({ email: email} , { $set: { quote: req.body.quote}});

        return res.json({ status: 'ok'});
    } catch (error) {
        console.log(error);
        res.json({status: "error", error: "Invalid token"})
    }
});


app.listen(port, () => {
  console.log(`Server started on http://localhost:${port}`);
})