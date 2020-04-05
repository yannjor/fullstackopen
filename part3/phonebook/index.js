require('dotenv').config();
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const Person = require('./models/person');
const app = express();


morgan.token('post_body', (req, res) => {
    if (req.method === 'POST')
        return JSON.stringify(req.body);
});

app.use(express.json());
app.use(morgan(':method :url :status :res[content-length] - :response-time ms :post_body'));
app.use(cors());
app.use(express.static('build'));


app.get('/api/persons', (req, res) => {
    Person.find({}).then(persons => {
        res.json(persons.map(p => p.toJSON()));
    });
});

app.get('/info', (req, res) => {
    const date = new Date();
    let len;
    Person.find({}).then(persons => {
        len = persons.length;
    });
    res.send(
        `<div>
            <p>Phonebook has info for ${len} people</p>
            <p>${date}</p>
        </div>`);
});


app.get('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(p => {
            res.json(p.toJSON());
        })
        .catch(err => {
            console.log(err);
            res.status(404).end();
        });
});

app.delete('/api/persons/:id', (req, res) => {
    Person.findById(req.params.id)
        .then(p => {
            Person.remove(p).then(() => {
                res.status(204).end();
            });
        })
        .catch(() => {
            res.status(204).end();
        });
});


app.post('/api/persons', (req, res) => {
    const body = req.body;
    if (!body.name || !body.number) {
        return res.status(400).json({
            error: 'name or number missing'
        });
    }
    /*
    if (Person.find({ name: body.name })) {
        return res.status(400).json({
            error: 'name must be unique'
        });
    }*/

    const person = new Person({
        name: body.name,
        number: body.number
    });

    person.save().then(savedPerson => {
        res.status(201).json(savedPerson.toJSON());
    });
});


const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});