// index.js
// where your node app starts

// init project
const express = require("express");
const app = express();

// enable CORS (https://en.wikipedia.org/wiki/Cross-origin_resource_sharing)
// so that your API is remotely testable by FCC 
const cors = require('cors');
app.use(cors({optionsSuccessStatus: 200}));  // some legacy browsers choke on 204

// http://expressjs.com/en/starter/static-files.html
app.use(express.static('public'));

// http://expressjs.com/en/starter/basic-routing.html
app.get("/", function (req, res) {
  res.sendFile(__dirname + '/src/pages/index.html');
});

// your first API endpoint... 
app.get("/api", (req, res) => {
  res.json({
    unix: new Date().getTime(),
    utc: new Date().toUTCString()
  });
});

app.get("/api/:date", (req, res) => {
  const date = req.params.date;

  if (!isNaN(Number(date)) && date.length == 13) {
    return res.json({
      unix: parseInt(date),
      utc: new Date(Number(date)).toUTCString()
    });
  }

  if (new Date(date).toUTCString() !== 'Invalid Date') {
    return res.json({
      unix: new Date(date).getTime(),
      utc: new Date(date).toUTCString()
    });
  }

  res.json({ error: 'Invalid Date' });
})
// listen for requests :)
const listener = app.listen(process.env.PORT, function () {
  console.log('Your app is listening on port ' + listener.address().port);
});
