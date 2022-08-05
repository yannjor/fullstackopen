require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();

morgan.token("post_body", (request, response) => {
  if (request.method === "POST") return JSON.stringify(request.body);
});

// middlewares
app.use(express.json());
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post_body"
  )
);
app.use(cors());
app.use(express.static("build"));

app.get("/info", (request, response) => {
  const date = new Date();
  let len;
  Person.find({}).then((persons) => {
    len = persons.length;
  });
  response.send(
    `<div>
       <p>The phonebook has info for ${len} people</p>
       <p>${date}</p>
     </div>`
  );
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      response.json(person.toJSON());
    })
    .catch((error) => {
      console.log(error);
      response.status(404).end();
    });
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      Person.remove(person).then(() => {
        response.status(204).end();
      });
    })
    .catch((error) => {
      console.log(error);
      response.status(204).end();
    });
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  // if (Person.find({ name: name })) {
  //   return response.status(400).json({
  //     error: "name must be unique",
  //   });
  // }
  const person = new Person({ name, number });
  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson.toJSON());
  });
});

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
