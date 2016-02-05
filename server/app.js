const PORT = 3927;

const path = require('path');
const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const monk = require('monk');

const app = express();
const db = monk('localhost/help-a-panhandler');

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

/**
 * Middleware!
 */
app.use(bodyParser.json());
app.use(cors());

/**
 * POST /reports
 *
 * TODO: document post request body
 *
 * Submit a new report
 */
app.post('/reports', (req, res) => {
  var location = req.body.location;
  var createdAt = new Date();
  var Reports = db.get('reports');

  Reports.insert({
    location, createdAt
  }).success((report) => {
    res.status(200).end();
  }).error((err) => {
    res.status(500).json(err);
  });

});

app.get('/', (req, res) => {
  var Reports = db.get('reports');

  Reports.find({}).success(function(reports) {
    res.render('index', { reports });
  }).error(function(err) {
    res.render('500', { err });
  });
});

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
