
const path = require("path")
const express = require("express")
const logger = require("morgan")
const bodyParser = require("body-parser") // simplifies access to request body
const fs = require('fs')  // NEW - this is required
const app = express()  // make express app
const port = process.env.PORT || 8081
const http = require('http').Server(app)
// ADD THESE COMMENTS AND IMPLEMENTATION HERE 
// 1 set up the view engine
// 2 manage our entries
// 3 set up the logger
// 4 handle valid GET requests
// 5 handle valid POST request (not required to fully work)
// 6 respond with 404 if a bad URI is requested

// 1 set up the view engine
app.set("views", path.resolve(__dirname, "views")) // path to views
app.set("view engine", "ejs") // specify our view

// 2 include public assets and use bodyParser
// Node uses __dirname for the The directory name of the current module.
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// 3 log requests to stdout and also
// log HTTP requests to a file using the standard Apache combined format
// see https://github.com/expressjs/morgan for more
var accessLogStream = fs.createWriteStream(__dirname + '/access.log', { flags: 'a' });
app.use(logger('dev'));
app.use(logger('combined', { stream: accessLogStream }));
// 4 http GET default page at /
app.get("/", function (req, res) {
  //res.sendFile(path.join(__dirname + '/assets/index.html'))
  res.render("index.ejs")
})

// 4 http GET /distance
app.get("/agecalculator", function (req, res) {
  res.render("agecalculator.ejs")
})
// 4 http GET /contact
app.get("/contact", function (req, res) {
  res.render("contact.ejs")
})
// 5 http POST /contact
/*app.post("/contact", function (req, res) {
  var api_key = '2dc0e5194f19a9b5e5e67cf58062b42d-4836d8f5-a5e1e84d';
  var domain = 'sandbox08e2802ce4ff4fb081d5492b42b9daa1.mailgun.org';
  var mailgun = require('mailgun-js')({ apiKey: api_key, domain: domain });

  var data = {
    from: 'Mail Gun postmaster@sandbox08e2802ce4ff4fb081d5492b42b9daa1.mailgun.org',
    to: 'rahulreddy062@gmail.com',
    subject: req.body.Studentname,
    text: req.body.comments
  };

  mailgun.messages().send(data, function (error, body) {
    console.log(body);
    if (!error)
      res.send("Mail Sent")
    else
      res.send("Mail not sent")
  });
})*/
app.get(function (req, res) {
  res.render("404")
})
// Listen for an application request on designated port
app.listen(port, function () {
  console.log('Web app started and listening on http://localhost:8081/')
})