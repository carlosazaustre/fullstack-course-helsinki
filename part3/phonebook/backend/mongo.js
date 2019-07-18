const mongoose = require('mongoose');

if ( process.argv.length < 3 ) {
  console.log('give password as argument');
  process.exit(1);
}

const password = process.argv[2];
const url = `mongodb+srv://fullstack-mooc:${password}@cluster0-jkcft.mongodb.net/phonebook-app?retryWrites=true&w=majority`;

mongoose.connect(url, { useNewUrlParser: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String
});

const Person = mongoose.model('Person', personSchema);

if (process.argv.length === 3) {
  console.log('phonebook:');
  Person
    .find({})
    .then(result => {
      result.forEach(person => {
        console.log(`${person.name} ${person.number}`);
      });
      mongoose.connection.close();
    });
}
if (process.argv.length === 5) {
  const contact = new Person({
    name: String(process.argv[3]),
    number: String(process.argv[4])
  });

  contact.save().then(response => {
    console.log(`added ${response.name} number ${response.number} to phonebook`);
    mongoose.connection.close();
  });
}