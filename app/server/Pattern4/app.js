const express = require('express')
const app = express()

app.use(function (req, res, next) {
  res.header('Access-Control-Allow-Origin', '*')
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept')
  next()
})

const buildsInfo = [
  {id: 1, owner: {userId: 1}},
  {id: 2, owner: {userId: 1}},
  {id: 3, owner: {userId: 2}},
]

const usersInfo = [
  {id: 1, name: 'Mike'},
  {id: 2, name: 'Irem'},
  {id: 3, owner: 'Joe'},
]

app.get('/api/version', (req, res) => {
  res.send('0.2')
})

app.get('/builds/', (req, res) => {
  res.send(buildsInfo)
})

app.get('/users/', (req, res) => {
  res.send(usersInfo)
})

app.listen(3100, () => console.log('Example app listening on port 3100!'))
