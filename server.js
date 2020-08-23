const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('/api/quotes/random', (req, res, next) => {
    const quoteToReturn = (getRandomElement(quotes));
    res.send({quote: quoteToReturn});   
})

app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person){
        const quotesByPerson = quotes.filter((quote) => quote.person === person);
        res.send({quotes: quotesByPerson});
    } else {
        res.send({quotes: quotes});
    }
})

app.listen(PORT);

