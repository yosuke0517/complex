const keys = require('./keys');

const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')

// express
const app = express()
app.use(cors())
app.use(bodyParser.json())

// pgClient setUp
const { Pool } = require('pg')
const pgClient = new Pool({
    user: keys.pgUser,
    host: keys.pgHost,
    database: keys.pgDatabase,
    password: keys.pgPassword,
    port: keys.pgPort
})
pgClient.on('connect', () => {
    pgClient
        .query('CREATE TABLE IF NOT EXISTS values (number INT)')
        .catch((err) => console.log(err));
});


// redisClient setUp
const redis = require('redis')
const redisClient = redis.createClient({
    host: keys.redisHost,
    port: keys.redisPort,
    retry_strategy: () => 1000
})
const redisPablisher = redisClient.duplicate()

app.get('/', (req, res) => {
    res.send('HI!!!!')
})

app.get('/values/all', async (req, res) => {
    const values = await pgClient.query('SELECT * from values')
    console.log('values')
    console.log(values)
    res.send(values.rows)
})

app.get('/values/current', async (req, res) => {
    redisClient.hgetall('values', (err, values) => {
        res.send(values)
    })
})

app.post('/values', async (req, res) => {
    const index = req.body.index
    if(parseInt(index) > 40) {
        return res.status(422).send('index too high')
    }
    redisClient.hset('values', index, 'Nothing yet')
    redisPablisher.publish('insert', index)
    pgClient.query('INSERT INTO values(number) VALUES($1)', [index])

    res.send({working: true})
})

app.listen(5000, err => {
    console.log('Listening port 5000')
})