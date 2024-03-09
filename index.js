const express = require('express')
const app = express()
require('dotenv').config()

const Person = require('./models/Person')

app.use(express.static('dist'))

const morgan = require('morgan')

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
}) 

app.use(morgan(':method :url :status :response-time :body')) 

const cors = require('cors')

app.use(cors())
app.use(express.json())

app.get('/api/persons', (request, response) => {
  Person.find({}).then(persons => {
    response.json(persons)
  })
})

app.get('/api/persons/:id', (request, response) => {
  Person.findById(request.params.id)
    .then(person => {
      if (person) {
        response.json(person)
      } else {
        response.status(404).end()
      }
    })
    .catch(error => {
      console.log(error)
    })
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
  Person.findByIdAndDelete(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => {
      console.log(error)
      response.status(500).end()
    })
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
