require('dotenv').config()
const express = require('express')
const app = express()
const morgan = require('morgan')
const cors = require('cors')
const Person = require('./models/person')

app.use(express.json())
app.use(morgan('tiny'))
app.use(express.static('dist'))
app.use(cors())
morgan.token('body', (request) => JSON.stringify(request.body))

app.get('/api/persons', (request, response) => {
    Person.find({}).then(persons => {
        response.json(persons)
    })
})

app.get('/info', (request, response) => {
    const date = new Date()
    response.send(`<p>Phonebook has info for ${persons.length} people</p><p>${date}</p>`)
})

app.get('/api/persons/:id', (request, response) => {
    Person.findById(request.params.id).then(person => {
        response.json(person)
    })
})

app.delete('/api/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).json()
})

const postLogger = morgan(':method :url :status :res[content-length] - :response-time ms :body')
app.post('/api/persons', postLogger, (request, response, next) => {
    const body = request.body
    if (!body.name || !body.number) {
        return response.status(400).json({
            error: 'name and number required'
        })
    }

    const nameExists = Person.find({name: body.name})
    const numberExists = Person.find({number: body.number})

    if (nameExists) {
        return response.status(400).json({
            error: 'name must be unique'
        })
    }
    if (numberExists) {
        return response.status(400).json({
            error: 'number must be unique'
        })
    }

    if (body.content === undefined) {
        return response.status(400).json({ error: 'content missing' })
    }

    const person = new Person({
        name: body.name,
        number: body.number,
    })

    person.save().then(savedPerson => {
        response.json(savedPerson)
    })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})