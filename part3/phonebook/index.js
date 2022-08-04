const express = require("express");
const morgan = require("morgan");
const cors = require("cors");

const app = express();

let persons = [
  {
    id: 1,
    name: "Arto Hellas",
    number: "040-123456",
  },
  {
    id: 2,
    name: "Ada Lovelace",
    number: "39-44-5323523",
  },
  {
    id: 3,
    name: "Dan Abramov",
    number: "12-43-234345",
  },
  {
    id: 4,
    name: "Mary Poppendieck",
    number: "39-23-6423122",
  },
];

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
  response.send(
    `<div>
       <p>The phonebook has info for ${persons.length} people</p>
       <p>${date}</p>
     </div>`
  );
});

app.get("/api/persons", (request, response) => {
  response.json(persons);
});

app.get("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  const person = persons.find((p) => p.id === id);
  if (person) {
    response.json(person);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/persons/:id", (request, response) => {
  const id = Number(request.params.id);
  persons = persons.filter((p) => p.id !== id);
  response.status(204).end();
});

app.post("/api/persons", (request, response) => {
  const body = request.body;
  if (!body.name || !body.number) {
    return response.status(400).json({
      error: "name or number missing",
    });
  }
  if (persons.find((p) => p.name === body.name)) {
    return response.status(400).json({
      error: "name must be unique",
    });
  }
  const person = {
    name: body.name,
    number: body.number,
    id: Math.floor(Math.random() * 10000 + 100),
  };
  persons = persons.concat(person);
  response.status(201).json(person);
});

const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
