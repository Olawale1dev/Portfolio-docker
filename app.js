// app.js
const path = require('path');
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Comment = require('./models/comment');  // Import the comment model

const app = express();

// Middleware to parse incoming request bodies
app.use(bodyParser.json());

// MongoDB Connection
mongoose.connect('mongodb://localhost:27017/myportfolio', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log('Connected to MongoDB');
}).catch((error) => {
  console.error('Error connecting to MongoDB', error);
});

// POST route to submit a comment
app.post('/comments', async (req, res) => {
  const { username, text } = req.body;

  // Create a new comment
  const newComment = new Comment({
    username,
    text,
  });

  try {
    // Save the comment to the database
    await newComment.save();
    res.status(201).json(newComment);
  } catch (error) {
    res.status(400).json({ error: 'Failed to submit comment' });
  }
});

// GET route to fetch all comments
app.get('/comments', async (req, res) => {
  try {
    const comments = await Comment.find();
    res.status(200).json(comments);
  } catch (error) {
    res.status(400).json({ error: 'Failed to fetch comments' });
  }
});

// **Serve Static Files from 'public' Directory**
app.use(express.static(path.join(__dirname, "public")));

// **Serve Index.html when Visiting "/"**
app.get("/", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});


// Server listening
const PORT = process.env.PORT || 2424;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
