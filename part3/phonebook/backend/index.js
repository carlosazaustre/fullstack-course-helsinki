require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Person = require('./models/person');

const app = express();
const port = process.env.PORT || 3001;

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
};

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    response.status(400).send({ error: 'malformatted id' });
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message });
  }

  next(error);
};

morgan.token('body', (req) => {
  return JSON.stringify(req.body);
});

app.use(morgan(':method :url - :body'));
app.use(express.static('build'));
app.use(bodyParser.json());

app.post('/api/persons', (req, res, next) => {
  const { body } = req;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save()
    .then(savedPerson => savedPerson.toJSON())
    .then(savedAndFormattedPerson => res.json(savedAndFormattedPerson))
    .catch(error => next(error));
});

app.get('/api/persons', (req, res, next) => {
  Person.find({})
    .then(people => res.json(people.map(person => person.toJSON())))
    .catch(error => next(error));
});


app.get('/api/persons/:id', (req, res, next) => {
  Person.findById(req.params.id)
    .then(person => res.json(person.toJSON()))
    .catch(error => next(error));
});

app.put('/api/persons/:id', (req, res, next) => {
  const body = req.body;
  const person = {
    name: body.name,
    number: body.number
  };

  Person.findByIdAndUpdate(req.params.id, person, { new: true })
    .then(updatedPerson => res.json(updatedPerson.toJSON()))
    .catch(error => next(error));
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(() => res.status(204).end())
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  Person.find({}).then(people => {
    const length = people.length;
    const date = new Date();
    res.send(`Phonebook has info for ${length} people at ${date}`);
  });
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});