const PORT = 3927;

const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const monk = require('monk');

const app = express();
const db = monk('localhost/help-a-panhandler');

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
  var reports = db.get('reports');

  reports.insert({
    location, createdAt
  }).success((report) => {
    res.status(200).end();
  }).error((err) => {
    res.status(500).json(err);
  });

});

app.listen(PORT, () => {
  console.log('Listening on', PORT);
});
