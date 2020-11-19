const cors = require('cors')
const express = require('express')
const app = express()

app.use(cors())

app.get('/', (req, res) => {
  return res.json ([
    {name: 'lab 01', bloco: '10', pcs: '35'},  
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 01', bloco: '10', pcs: '35'},     
    {name: 'lab 01', bloco: '10', pcs: '35'},
    {name: 'lab 02', bloco: '9', pcs: '65'},
    {name: 'lab 03', bloco: '8', pcs: '98'},
    {name: 'lab 04', bloco: '7', pcs: '78'},
    {name: 'lab 05', bloco: '7', pcs: '11'},
    {name: 'lab 06', bloco: '9', pcs: '66'},
    {name: 'lab 07', bloco: '9', pcs: '44'},
    {name: 'lab 08', bloco: '7', pcs: '85'},
    {name: 'lab 09', bloco: '5', pcs: '15'},
    {name: 'lab 01', bloco: '5', pcs: '65'},
    {name: 'lab 10', bloco: '8', pcs: '49'}
  ])
})
app.listen('1234')