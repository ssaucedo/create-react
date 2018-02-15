const express = require('express')
const app = express()
const Twit = require('twit')
const config = require('./config')


app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});


app.get('/', (req, res) => {
  const q = req.query.q || ''
  performGetTwits(q).then(tws => res.send(tws))
})


app.get('/twit/', (req, res) => {
  const id = req.query.id || ''
  performGetTwit(id).then(t => res.send(t))
})

app.listen(3000, () => console.log('Example app listening on port 3000!'))

const T = new Twit(config)

function performGetTwits (q) {
  return T.get('search/tweets', { q, count: 10 })
    .then((response) => response.data.statuses)
    .catch(err => err)
}

function performGetTwit (id) {
  return T.get(`statuses/show/${id}`)
    .then((response) => Array(response.data))
    .catch(err => err)
}