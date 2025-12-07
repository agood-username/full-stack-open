require('dotenv').config()
const express = require('express')
const morgan = require('morgan')

const app = express()

app.use(express.static('dist'))
app.use(express.json())

const Person = require('./models/person')

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

app.post('/api/persons', (request, response, next) => {
    const { name, number } = request.body

    Person.findOne({ name })
        .then(person => {
            if (person) {
                return response.status(400).json({
                    error: `${person.name} already in phonebook`
                })
            } else {
                const person = new Person({ name, number })
                return person.save().then(savedPerson => {
                    response.json(savedPerson)
                })
            }
        }).catch(error => next(error))
})

app.put('/api/persons/:id', (request, response, next) => {
    const { number } = request.body
    const id = request.params.id

    Person.findById(id)
        .then(person => {
            person.number = number
            return person.save().then(savedPerson => {
                response.json(savedPerson)
            })
        }).catch(error => next(error))
})

app.get('/api/persons', (request, response, next) => {
    Person.find({}).then(persons => {
        response.json(persons)
    }).catch(error => next(error))
})

app.get('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findById(id)
        .then(person => {
            response.json(person)
        })
        .catch(error => next(error))
})

app.delete('/api/persons/:id', (request, response, next) => {
    const id = request.params.id
    Person.findByIdAndDelete(id)
        .then(() => {
            response.status(204).end()
        })
        .catch(error => {
            next(error)
        })
})

app.get('/info', (_request, response) => {
    Person.find({}).then(persons => {
        response.send(`</p>Phonebook has info for ${persons.length} people.</p> <p>${new Date()}</p>`)
    })
})

const unknownEndpoint = (_request, response) => {
    response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, _request, response, next) => {
    console.error(error.message)

    if (error.name === 'CastError') {
        return response.status(400).send({ error: 'malformatted id' })
    }

    if (error.name === 'ValidationError') {
        return response.status(400).send({ error: error.message })
    }
    next(error)
}

app.use(errorHandler)


const PORT = 3001
app.listen(PORT , () => {
    console.log('App running in port', PORT)
})