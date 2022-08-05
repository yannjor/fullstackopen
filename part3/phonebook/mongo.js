const mongoose = require("mongoose");

const password = process.argv[2];
const URL = `mongodb+srv://fullstack:${password}@cluster0-ndwko.mongodb.net/phonebook?retryWrites=true&w=majority`;

const name = process.argv[3];
const number = process.argv[4];

mongoose.connect(URL, { useNewUrlParser: true, useUnifiedTopology: true });

const personSchema = new mongoose.Schema({
  name: String,
  number: String,
});

const Person = mongoose.model("Person", personSchema);

if (!name || !number) {
  Person.find({}).then((result) => {
    console.log("Phonebook:");
    result.forEach((person) => {
      console.log(person.name, person.number);
    });
    mongoose.connection.close();
  });
  return;
}

const person = new Person({
  name: name,
  number: number,
});

person.save().then((result) => {
  console.log(`Added ${name} with number ${number} to phonebook`);
  mongoose.connection.close();
});
