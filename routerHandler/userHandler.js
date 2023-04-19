const express = require('express');
const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const userSchema = require('../schemas/userSchema');

const router = express.Router();
const User = mongoose.model('User', userSchema);


// user signup 
router.post('/signup', async (req, res) => {
  try {
    const hashedPassword = await bcrypt.hash(req.body.password, 10); 
    const newUser = new User({
      name: req.body.name, 
      username: req.body.username, 
      password: hashedPassword
    });

    await newUser.save();

    res.status(200).json({ message: 'signup successful !' });
  } catch (err) {
    res.status(500).json({ message: 'signup failed!' });
  }
});


// user signup 
router.post('/login', async (req, res) => {
  try {

    const user = await User.find({ username: req.body.username });
    if (user && user.length > 0) {
      const isValidPassword = await bcrypt.compare(req.body.password, user[0].password);
      if (!isValidPassword)
        res.status(401).json({ error: `authentication failed` });

      // generate token
      const token = jwt.sign({username: user[0].username, userId: user[0]._id, }, process.env.JWT_SECRET, {
        expiresIn: '1h', 
      }); 

      res.status(200).json({
        access_token: token,
        message: 'login successful !'
      });

    } else {
      res.status(401).json({ error: `authentication failed` });
    }
  } catch (err) {
    res.status(401).json({ message: 'authentication failed' });
  }
});

router.get('/all', async (req, res) => {
  try {
      const allUsers = await User.find().populate("todos");
    res.status(200).json({ data: allUsers });

  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

// delete user
router.delete('/:id', async (req, res) => {
  try {
    res.status(200).json({ message: 'Todos was deleted successfully !' });
  } catch (err) {
    res.status(500).json({ message: 'There was a server side error !' });
  }
});

module.exports = router;
