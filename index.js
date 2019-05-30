const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const monk = require('monk')
const app = express()
const db = monk(url)
const port = 5000
const user = db.get('user')

app.use(cors())
app.use(bodyParser.json())

// crud functions
app.get('/', async function (req, res) {
  const results = await user.find()
  res.send(results)
})

app.get('/user/:id', async function (req, res) {
  const results = await user.findOne({ '_id': req.params.id })
  res.send(results)
})

app.post('/user', async function (req, res) {
  const body = req.body
  const results = await user.insert(body)
  res.send(results)
})

app.delete('/user/:id', async function (req, res) {
  const results = await user.remove({ '_id': req.params.id })
  res.send(results)
})

app.put('/user/:id', async function (req, res) {
  const results = await user.findOneAndUpdate(req.params.id, { $set: req.body })
  res.send(results)
})

// console log that its running
db.then(() => {
  console.log('db connected')
})

app.listen(port, () => console.log(`app is running on ${port}`))
