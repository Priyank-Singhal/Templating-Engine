const express = require('express');
const fetch = require("node-fetch");
const app = express();
const ejs = require('ejs');

// Set EJS as templating engine
app.set('view engine', 'ejs');
app.set('views', `${__dirname}/views`);
app.use(express.static(__dirname + '/public'));

const generateData = async () => {
    const response = await fetch('https://www.boredapi.com/api/activity');
    const data = await response.json();
    return data;
};

var pageEndpoints = [
    '/', '/page1', '/page2', '/page3', '/page4', '/page5', '/page6', '/page7', '/page8', '/page9', '/page10'
];
pageEndpoints.forEach(function (name) {
    app.get(name, async (req, res) => {
        const data = await generateData();
        res.render('home', {
            title: name === '/' ? 'Home Page' : `Page ${name.charAt(name.length - 1)}`,
            activity: data.activity,
            key: data.key,
            price: data.price,
            accessibility: data.accessibility,
            type: data.type
        });
    });
});

const server = app.listen(4000, function () {
    console.log('listening to port 4000')
});