const express = require("express")
const cors = require("cors")
const mongoose = require("mongoose")
const bcrypt = require("bcrypt")
const jwt = require('jsonwebtoken')
const User = require("./models/UserModel")
require('dotenv').config()


const app = express()
app.use(cors())
app.use(express.json())
const PORT = 8080

mongoose.connect(process.env.MONGO_URI);

app.get('/', (req, res) => {
  res.json({message: "hi"})
  console.log("hi")
})

app.post('/api/register', async(req, res) => {
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
		return res.json({ status: 'error', user: false })
	}
})

app.listen(PORT, () => {
  console.log(`Server started on port ${PORT}`)
})
