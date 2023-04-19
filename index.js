const express = require('express');
const app = express();



app.use((err, req, res, next) => {
  if (res.headersSent) {
    next('There was a problem !');
  } else {
    if (err.message) res.status(500).send(err.message);
    else res.status(500).send('there was an error !');
  }
});

app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
