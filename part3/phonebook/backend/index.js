const express = require('express');
const morgan = require('morgan');
const bodyParser = require('body-parser');

const app = express();
const port = 3001;

morgan.token('body', (req, res) => {
  return JSON.stringify(req.body);
})

app.use(bodyParser.json());
app.use(morgan(':method :url - :body'));

let persons = [
  {
    name: 'Arto Hellas',
    number: '040-123456',
    id: 1
  },
  {
    name: 'Ada Lovelace',
    number: '39-44-5323523',
    id: 2
  },
  {
    name: 'Dan Abramov',
    number: '12-43-234345',
    id: 3
  },
  {
    name: 'Mary Poppendieck',
    number: '39-23-6423122',
    id: 4
  }
];

const generateId = (max) => {
  return Math.floor(Math.random() * Math.floor(max));
}

app.post('/api/persons', (req, res) => {
  const { body } = req;
  if (!body.name) {
    return res.status(500).json({ error: 'name is missing' });
  }
  if (!body.number) {
    return res.status(500).json({ error: 'number is missing' })
  }

  if (persons.find(el => el.name === body.name)) {
    return res.status(500).json({ error: 'name must be unique' });
  }

  const person = {
    name: body.name,
    number: body.number,
    id: generateId(9999)
  };
  persons = persons.concat(person);
  res.json(person);
});

app.get('/api/persons', (req, res) => {
  res.json(persons);
});

app.get('/api/persons/:id', (req, res) => {
  const { id } = req.params;
  const found = persons.find(el => el.id === Number(id));
  if (found !== undefined) {
    return res.json(found);
  }

  return res.status(404).end();
});

app.get('/info', (req, res) => {
  const length = persons.length;
  const date = new Date();
  res.send(`Phonebook has info for ${length} people\n${date}`);
})

app.listen(port, () => {
  console.log(`API running on http://localhost:${port}`);
});