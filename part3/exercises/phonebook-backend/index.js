const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

morgan.token('body', (request, response) => JSON.stringify(request.body))
app.use(morgan(function (tokens, req, res) {
  return [
    tokens.method(req, res),
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    tokens.body(req, res),
  ].join(' ')
}))


let persons = [
    { 
      "id": "1",
      "name": "Arto Hellas", 
      "number": "040-123456"
    },
    { 
      "id": "2",
      "name": "Ada Lovelace", 
      "number": "39-44-5323523"
    },
    { 
      "id": "3",
      "name": "Dan Abramov", 
      "number": "12-43-234345"
    },
    { 
      "id": "4",
      "name": "Mary Poppendieck", 
      "number": "39-23-6423122"
    }
]

const generateId = (range = 1000000) => {
    const id = Math.floor(Math.random() * range)
    return String(id)
}

app.post('/api/persons', (request, response) => {
    const {name, number} = request.body

    const personExists = persons.find(person => person.name.toLowerCase() === name.toLowerCase())

    if (personExists) {
        return response.status(400).json({
            error: `${personExists.name} already in phonebook`
        })
    }

    if (!name || !number || !name && !number) {
        return response.status(400).json({
            error: 'one or more missing properties'
        })
    }
    
    const person = {
        id: generateId(),
        name,
        number
    }

    persons = persons.concat(person)
    response.json(person)
})

app.get('/api/persons', (request, response) => {
    response.json(persons)
})

app.get('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        return response.status(404).json({
            error: "Person not found"
        })
    }

    response.json(person)
})

app.delete('/api/persons/:id', (request, response) => {
    const id = request.params.id
    const person = persons.find(person => person.id === id)

    if (!person) {
        return response.status(404).json({
            error: "Person not found"
        })
    }

    persons = persons.filter(p => p.id !== person.id)

    response.status(204).end()
})

app.get('/info', (request, response) => {
    response.send(`</p>Phonebook has info for ${persons.length} people.</p> <p>${new Date()}</p>`)
})


const PORT = 3001
app.listen(PORT , () => {
    console.log('App running in port', PORT)
})