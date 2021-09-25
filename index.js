
const express = require('express')
const app = express()
const port = process.env.PORT || 3000
const mongo = process.env.MONGO || 'mongodb://localhost/minhas-series-rest'

const User = require('./models/user')

const bodyParser = require('body-parser')
//app.use(bodyParser({ extended: true })) => teve atualização
app.use(bodyParser.json())

const mongoose = require('mongoose')
mongoose.Promise = global.Promise

const series = require('./routes/series')

app.use('/series', series)

app.post('/auth', async(req, res) => {
  const user = req.body
  res.send(user)
})

const createInitialUsers = async() => {
  const total = await User.count({})
  if(total ===0){
    const user = new User({
      username: 'renatoDomingues',
      password: '123456',
      roles: ['restrito', 'admin']
    })
    await user.save()

    const user2 = new User({
      username: 'restrito',
      password: '123456',
      roles: ['restrito']
    })
    await user2.save()
  }
}

// const series = [
//   { name: 'Friends' },
//   { name: 'Breaking Bad' }
// ]

// app.get('/series', (req, res) => res.send(series))

/*
mongoose
  .connect(mongo, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    app.listen(port, () => console.log('listening...'))
  })
  .catch(e => console.log(e))
  */

  mongoose
  .connect('mongodb+srv://minhas-series-rest:minhas-series-rest@cluster0.sj54m.mongodb.net/myFirstDatabase?retryWrites=true&w=majority', { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    createInitialUsers()
    app.listen(port, () => console.log('listening...'))
  })
  .catch(e => console.log(e))