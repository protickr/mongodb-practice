const express = require('express');
const mongoose = require('mongoose');
const todoHandler = require('./routerHandler/todoHandler');
const app = express();


// connect mongoose to mongodb database 
mongoose.connect('mongodb://127.0.0.1/todos').then(()=>{
    console.log("connection successful");
}).catch((err)=>{
    console.log(err.message);
});

// parse request as JSON 
app.use(express.json());

// routes 
app.use('/todo', todoHandler);

// error handler
app.use((err, req, res, next) => {
  if (res.headersSent) {
    next('There was a problem !');
  } else {
    if (err.message) res.status(500).send(err.message);
    else res.status(500).send('there was an error !');
  }
});

// server listen on port 
app.listen(3000, () => {
  console.log(`listening on port 3000`);
});
