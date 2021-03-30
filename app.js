// Require Libraries
const express = require('express');
const Tenor = require("tenorjs").client({
    // Replace with your own key
    "Key": "XH3XHXTQ2BE4",
    "Filter": "high", // "off", "low", "medium", "high", not case sensitive
    "Locale": "en_US", // Your locale here, case-sensitivity depends on input
})
//App Setup
const app = express();

//Middleware

const exphbs = require('express-handlebars');

app.engine('handlebars', exphbs({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');

//Routes

app.get('/greetings/:name', (req,res) => {
    //grab the name from the path
    const name = req.params.name;
    //render the greetings view, passing along the name
    res.render('greetings', {name});
})

app.get('/', (req, res) => {
    //handle the home page when we havent queried yet
    term = ""
    if (req.query.term){
        term = req.query.term
    }
    //tenor.serach.query(sesarch, limit)
    Tenor.Search.Query(term, "10")
        .then(response => {
            //store the gifs we get back
            const gifs = response;
            //pass gifs as object to home page
            res.render('home', { gifs })
        }).catch(console.error);
})

//Start Server

app.listen(3000, () => {
    console.log('Gif Search listening on port localhost:3000!');
})