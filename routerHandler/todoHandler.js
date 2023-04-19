const express = require('express');
const mongoose = require('mongoose');
const todoSchema = require('../schemas/todoSchema');
const router = express.Router();
const Todo = mongoose.model('Todo', todoSchema);

// return all todos
router.get('/', async (req, res) => {
  try {
    const todos = await Todo.find({ status: 'active' }, { __v: 0 });
    res.status(200).json({ data: todos });
  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

// return all todos
router.get('/active', async (req, res) => {
  try {
    const todoModelObj = new Todo();
    const todos = await todoModelObj.findActive();
    res.status(200).json({ data: todos });
  } catch (err) {
    console.log(err.message);
    res.status(500).json({ message: 'There was a server side error !' });
  }
});


// return all todos
router.get('/js', async (req, res) => {
    try {
      const todos = await Todo.findByJS();
      res.status(200).json({ data: todos });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'There was a server side error !' });
    }
  });


// return todos by language
router.get('/language', async (req, res) => {
    try {
      const todos = await Todo.find().byLanguage("js");
      res.status(200).json({ data: todos });
    } catch (err) {
      console.log(err.message);
      res.status(500).json({ message: 'There was a server side error !' });
    }
  });



// return a todo by ID
router.get('/:id', async (req, res) => {
  try {
    const todo = await Todo.find({ _id: req.params.id }, { __v: 0 });
    res.status(200).json({ data: todo });
  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

// post a todo
router.post('/', async (req, res) => {
  const newTodo = new Todo(req.body);
  try {
    await newTodo.save();
    res.status(200).json({ message: 'Todo was created successfully !' });
  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

// post single todo
router.post('/multiple', async (req, res) => {
  try {
    await Todo.insertMany(req.body);
    res.status(200).json({ message: 'Todos was created successfully !' });
  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

// update single todo
router.put('/:id', async (req, res) => {
  try {
    await Todo.updateOne(
      { _id: req.params.id },
      { $set: { status: 'active' } }
    );
    res.status(200).json({ message: 'Todos was updated successfully !' });
  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

// update single todo
router.delete('/:id', async (req, res) => {
  try {
    await Todo.deleteOne({ _id: req.params.id });
    res.status(200).json({ message: 'Todos was deleted successfully !' });
  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

module.exports = router;
