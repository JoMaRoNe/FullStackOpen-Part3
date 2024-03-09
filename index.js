require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/Person')

const app = express()

app.use(express.json())
app.use(cors())
app.use(express.static('dist'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
}) 

app.use(morgan(':method :url :status :response-time :body')) 

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const person = persons.find(p => p.id === id)

    if (person) {
        response.json(person)
    } else {
        response.status(404).end
    }
})

app.post('/api/persons', (request, response) => {
  const body = request.body

  console.log(body)
  
  if ( body.name === '' || body.number === '' ) {
    return response.status(400).json({error:'Name and/or Number is missing'})
    } 
  const person = new Person({
    name: body.name,
    number: body.number,
  })
  
  person.save().then(savedPerson => {
    response.json(savedPerson)
  })
})

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.get('/info', (request, response) => {
    const people = persons.length
    const date = new Date().toString()

    response.send(`<p>Phonebook has info for ${people} people</p><p>${date}</p>`)
}) 

const PORT = process.env.PORT || 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
  })

/*
const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}/api/persons`)
    console.log(`http://localhost:${PORT}/info`)
})
*/
