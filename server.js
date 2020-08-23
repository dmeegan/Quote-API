const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));

app.get('api/quotes/random', (req, res, next) => {
    const quoteReturned = getRandomElement(quotes);
    if (quoteReturned) {
        res.status(204).send(quoteReturned)
    } else {
        res.status(404).send('Oops! Something went wrong.')
    }=
})

app.get('api/quotes/:person', (req, res, next) => {
    if (req.params.id){
        const quotesByPerson = quotes.filter(() => quotes.person === req.params.id);
        res.send(quotesByPerson);
    } else {
        res.send(quotes);
    }
})

app.listen(PORT);

