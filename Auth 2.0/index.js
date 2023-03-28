const express = require('express');
const session = require('express-session');
const authRouter = require('./routes/auth');

// Initialize the Express app
const app = express();

// Set up session middleware
app.use(session({
  secret: 'my-secret-key',
  resave: false,
  saveUninitialized: true
}));

// Use the authRouter middleware for OAuth 2.0 authentication
app.use('/auth', authRouter);

// Define the routes for the app
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/dashboard', (req, res) => {
  // Check if the user is authenticated
  if (req.session.accessToken) {
    // User is authenticated, render the dashboard page
    res.send('Welcome to the dashboard!');
  } else {
    // User is not authenticated, redirect to the login page
    res.redirect('/auth/login');
  }
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Server started on port ${port}`);
});
