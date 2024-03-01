const express = require('express')
const morgan = require('morgan')
const app = express()

app.use(express.json())

//app.use(morgan('tiny'))

morgan.token('body', (request) => {
  return JSON.stringify(request.body)
}) 

app.use(morgan(':method :url :status :response-time :body')) 

let persons = [
    { 
      "id": 1,
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": 2,
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": 3,
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": 4,
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }

]


app.get('/api/persons', (request, response) => {
    response.json(persons)
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

app.delete('/api/persons/:id', (request, response) => {
  const id = Number(request.params.id)
  persons = persons.filter(p => p.id !== id)

  response.status(204).end()
})

app.post('/api/persons', (request, response) => {
  const body = request.body
  
  if (!body.name || !body.number) {
    return response.status(400).json({
      error:'Name and/or Number is missing'
    })
  } else if (persons.find(p => p.name === body.name)) {
      return response.status(400).json({
        error: 'name must be unique'
      })
  } else {
    const person = {
      id: Math.floor(Math.random() * 300),
      name: body.name,
      number: body.number
    }

    persons = persons.concat(person)

    response.json(person)
  }
})


app.get('/info', (request, response) => {
    const people = persons.length
    const date = new Date().toString()

    response.send(`<p>Phonebook has info for ${people} people</p><p>${date}</p>`)
}) 

const PORT = 3001
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
    console.log(`http://localhost:${PORT}/api/persons`)
    console.log(`http://localhost:${PORT}/info`)
})
