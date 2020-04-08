const express = require("express");
const app = express();
require("dotenv").config();
const Person = require("./models/person");
const cors = require("cors");
const morgan = require("morgan");

morgan.token("post_body", (request, response) => {
  if (request.method === "POST" || request.method === "PUT")
    return JSON.stringify(request.body);
});

app.use(cors());
app.use(express.json());
app.use(express.static("build"));
app.use(
  morgan(
    ":method :url :status :res[content-length] - :response-time ms :post_body"
  )
);

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((p) => p.toJSON()));
  });
});

app.get("/info", (request, response) => {
  const date = new Date();
  Person.countDocuments({}).then((res) => {
    response.send(
      `<div>
        <p>Phonebook has info for ${res} people</p>
        <p>${date}</p>
       </div>`
    );
  });
});

app.get("/api/persons/:id", (request, response, next) => {
  Person.findById(request.params.id)
    .then((p) => {
      if (p) {
        response.json(p.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((err) => next(err));
});

app.delete("/api/persons/:id", (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((err) => next(err));
});

app.post("/api/persons", (request, response, next) => {
  const body = request.body;

  const person = new Person({
    name: body.name,
    number: body.number,
  });

  person
    .save()
    .then((savedPerson) => savedPerson.toJSON())
    .then((savedAndFormattedPerson) => {
      response.status(201).json(savedAndFormattedPerson);
    })
    .catch((err) => next(err));
});

app.put("/api/persons/:id", (request, response, next) => {
  const body = request.body;
  const person = {
    name: body.name,
    number: body.number,
  };
  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((err) => next(err));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};
app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.log(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
