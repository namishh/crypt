const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("./models/UserModel")
const Question = require("./models/QuestionModel")
require('dotenv').config()


const app = express()
const corsOpts = {
  origin: '*',
  credentials: true,
  methods: ['GET', 'POST', 'HEAD', 'PUT', 'PATCH', 'DELETE'],
  allowedHeaders: ['Content-Type'],
  exposedHeaders: ['Content-Type', 'x-access-token]
};
app.use(cors(corsOpts));
app.use(express.json())
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  next();
});
const PORT = 8080
mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.json({ message: "hi" })
  console.log("hi")
})


app.post('/api/register', async (req, res) => {
  console.log(req.body)
  const newPassword = await bcrypt.hash(req.body.pass, 10)
  try {
    console.log("h")
    await User.create({
      username: req.body.username,
      email: req.body.email,
      password: newPassword,
    })
    console.log("i")
    res.json({ status: 'ok' })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'Duplicate email' })
  }
})

app.get('/api/getQuestion', async (req, res) => {
  const token = req.headers['x-access-token']
  try {
    console.log('hi')
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOne({ email: email })
    console.log(user)
    const question = await Question.findOne({ question: `${user.level}` });
    return res.json({ status: 'ok', data: question })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})

app.post('/api/login', async (req, res) => {
  const user = await User.findOne({
    email: req.body.email,
  })

  if (!user) {
    return { status: 'error', error: 'Invalid login' }
  }

  const isPasswordValid = await bcrypt.compare(
    req.body.pass,
    user.password
  )

  if (isPasswordValid) {
    const token = jwt.sign(
      {
        username: user.username,
        email: user.email,
        level: user.level,
        lastUpdate: user.lastUpdate
      },
      'secret123'
    )

    return res.json({ status: 'ok', user: token })
  } else {
    console.log("huh")
    return res.json({ status: 'error', user: false })
  }
})

app.get("/api/getData", async (req, res) => {
  const token = req.headers['x-access-token']

  try {
    const decoded = jwt.verify(token, 'secret123')
    const email = decoded.email
    const user = await User.findOne({ email: email })

    return res.json({ status: 'ok', data: user })
  } catch (error) {
    console.log(error)
    res.json({ status: 'error', error: 'invalid token' })
  }
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
