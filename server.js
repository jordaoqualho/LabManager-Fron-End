const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  return res.json ([
    {name: 'lab 01'},
    {name: 'lab 02'},
    {name: 'lab 03'},
    {name: 'lab 04'},
    {name: 'lab 05'},
    {name: 'lab 06'},
    {name: 'lab 07'},
    {name: 'lab 08'},
    {name: 'lab 09'},
    {name: 'lab 10'}
  ])
})
app.listen('1234')