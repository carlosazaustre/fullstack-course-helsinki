require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');
const Person = require('./models/person');

const app = express();
const port = process.env.PORT || 3001;

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: 'unknown endpoint' });
}

const errorHandler = (error, request, response, next) => {
  console.log(error.message);

  if (error.name === 'CastError' && error.kind == 'ObjectId') {
    response.status(400).send({ error: 'malformatted id' });
  }

  next(error);
}

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
})

app.use(morgan(':method :url - :body'));
app.use(express.static('build'));
app.use(bodyParser.json());

app.post('/api/persons', (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res.status(500).json({ error: 'name is missing' });
  }
  if (!body.number) {
    return res.status(500).json({ error: 'number is missing' })
  }

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person.save().then(savedPerson => {
    res.json(savedPerson.toJSON());
  });
});

app.get('/api/persons', (req, res) => {
  Person.find({}).then(people => {
    res.json(people.map(person => person.toJSON()));
  });
});

app.get('/api/persons/:id', (req, res) => {
  Person.findById(req.params.id).then(person => {
    res.json(person.toJSON());
  });
});

app.delete('/api/persons/:id', (req, res, next) => {
  Person.findByIdAndRemove(req.params.id)
    .then(result => res.status(204).end())
    .catch(error => next(error));
});

app.get('/info', (req, res) => {
  const length = persons.length;
  const date = new Date();
  res.send(`Phonebook has info for ${length} people\n${date}`);
});

app.use(unknownEndpoint);
app.use(errorHandler);

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});