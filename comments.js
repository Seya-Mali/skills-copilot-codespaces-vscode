// Create web server
const express = require('express');
const app = express();
// Include the body-parser package
const bodyParser = require('body-parser');
// Include the comments.js file
const comments = require('./comments');
// Include the cors package
const cors = require('cors');

// Use the body-parser package
app.use(bodyParser.json());
// Use the cors package
app.use(cors());

// GET request to /comments
app.get('/comments', (req, res) => {
  // Use the getAllComments function from the comments.js file
  comments.getAllComments()
    .then(comments => {
      // Send the comments as a JSON response
      res.json(comments);
    })
    .catch(err => {
      // Send a 500 status code if there was an error
      res.status(500).json({
        message: err.message
      });
    });
});

// POST request to /comments
app.post('/comments', (req, res) => {
  // Get the comment from the request body
  const comment = req.body;
  // Use the createComment function from the comments.js file
  comments.createComment(comment)
    .then(comment => {
      // Send the comment as a JSON response
      res.json(comment);
    })
    .catch(err => {
      // Send a 500 status code if there was an error
      res.status(500).json({
        message: err.message
      });
    });
});

// Start the server on port 4001
app.listen(4001, () => {
  console.log('Server is running on http://localhost:4001');
});

// Run the server with the command node comments.js in the terminal
// Send a GET request to http://localhost:4001/comments to see the comments
// Send a POST request to http://localhost:4001/comments with a JSON body to add a comment
// The JSON body should have a name and a comment property
// Example: { "name": "Alice", "comment": "Hello!" }