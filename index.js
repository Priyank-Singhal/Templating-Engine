const express = require('express');
const fetch = require("node-fetch");
const app = express();
const ejs = require('ejs');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));

const generateData = async () => {
    const response = await fetch('https://www.boredapi.com/api/activity');
    const data = await response.json();
    return data;
};

app.get('/', async (req, res) => {
    const data = await generateData();
    res.render('home', {
        activity: data.activity,
        key: data.key,
        price: data.price,
        accessibility: data.accessibility,
        type: data.type
     });
});

const server = app.listen(4000, function () {
    console.log('listening to port 4000')
});