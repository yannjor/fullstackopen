require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const Person = require("./models/person");

const app = express();

morgan.token("post_body", (request, response) => {
  if (request.method === "POST" || request.method === "PUT") {
    return JSON.stringify(request.body);
  }
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
  Person.countDocuments({}).then(() => {
    response.send(
      `<div>
         <p>The phonebook has info for ${len} people</p>
         <p>${date}</p>
      </div>`
    );
  });
});

app.get("/api/persons", (request, response) => {
  Person.find({}).then((persons) => {
    response.json(persons.map((person) => person.toJSON()));
  });
});

app.get("/api/persons/:id", (request, response) => {
  Person.findById(request.params.id)
    .then((person) => {
      if (person) {
        response.json(person.toJSON());
      } else {
        response.status(404).end();
      }
    })
    .catch((error) => next(error));
});

app.delete("/api/persons/:id", (request, response) => {
  Person.findByIdAndRemove(request.params.id)
    .then((result) => {
      response.status(204).end();
    })
    .catch((error) => next(error));
});

app.post("/api/persons", (request, response) => {
  const { name, number } = request.body;
  if (!name || !number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  const person = new Person({ name, number });
  person.save().then((savedPerson) => {
    response.status(201).json(savedPerson.toJSON());
  });
});

app.put("/api/persons/:id", (request, response, next) => {
  const { name, number } = request.body;
  const person = { name, number };

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
    .then((updatedPerson) => {
      response.json(updatedPerson.toJSON());
    })
    .catch((error) => next(error));
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "unknown endpoint" });
};

app.use(unknownEndpoint);

const errorHandler = (error, request, response, next) => {
  console.error(error.message);
  if (error.name === "CastError") {
    return response.status(400).send({ error: "malformatted id" });
  }
  next(error);
};

app.use(errorHandler);

const PORT = process.env.PORT;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
