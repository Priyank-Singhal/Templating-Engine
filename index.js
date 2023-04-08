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



// // Define the template for the page
// const template = `
//   <!DOCTYPE html>
//   <html>
//     <head>
//       <meta charset="utf-8">
//       <title>{{title}}</title>
//     </head>
//     <body>
//       <h1>{{heading}}</h1>
//       <p>{{content}}</p>
//     </body>
//   </html>
// `;

// // Make API requests to generate data for the pages
// const generateData = async () => {
//     console.log("Before API")
//       const response = await fetch('https://www.boredapi.com/api/activity');
//     const data = await response.json();
//     return data;
// };

// // Generate unique pages using the template and data
// const generatePages = async (numPages) => {
//     const data = await generateData();
//     const pages = [];
//     for (let i = 1; i <= numPages; i++) {
//         const pageData = {
//             title: `Page ${i}`,
//             // heading: data.headings[i % data.headings.length],
//             // content: data.content[i % data.content.length],
//         };
//         const page = await ejs.render(template, pageData);
//         pages.push(page);
//     }
//     return pages;
// };

// // Serve the pages
// app.get('/', async (req, res) => {
//     const pages = await generatePages(10);
//     res.send(pages.join(''));
// });

// app.listen(3000, () => {
//     console.log('Server started on port 3000');
// });
