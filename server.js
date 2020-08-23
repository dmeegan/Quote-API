const express = require('express');
const app = express();

const { quotes } = require('./data');
const { getRandomElement } = require('./utils');

const PORT = process.env.PORT || 4001;

app.use(express.static('public'));


//GET request for returning a random quote from the quotes list.
app.get('/api/quotes/random', (req, res, next) => {
    const quoteToReturn = (getRandomElement(quotes));
    res.send({quote: quoteToReturn});   
});


//GET request for returning a list of quotes attributed to a particular person, based on the user input for the person.
app.get('/api/quotes', (req, res, next) => {
    const person = req.query.person;
    if (person){
        const quotesByPerson = quotes.filter((quote) => quote.person === person);
        res.send({quotes: quotesByPerson});
    } else {
        res.send({quotes: quotes});
    }
});

//POST request for adding a quote to the quotes list based on the user input for the quote and the person who it is attributed to.
app.post('/api/quotes', (req, res, next) => {
    const quoteToAdd = req.query.quote;
    const personToAdd = req.query.person;
    if (quoteToAdd && personToAdd) {
        const newQuote = {quote: quoteToAdd, person: personToAdd};
        quotes.push(newQuote);
        res.send({quote: newQuote});
    } else {
        res.status(400).send('Please enter a quote and the attributing person.');
    }
})

app.listen(PORT);

