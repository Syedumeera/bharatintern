import express from 'express';
import { connect, Schema, model } from 'mongoose';
import { json } from 'body-parser';

const app = express();
const port = 3000;

// Connect to MongoDB
connect('mongodb://localhost:27017/userRegistration', {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

// Create a user schema
const userSchema = new Schema({
  username: String,
  email: String,
  password: String
});

const User = model('User', userSchema);

// Middleware to parse JSON
app.use(json());

// Serve the HTML file
app.get('/', (req, res) => {
  res.sendFile(__dirname + '/registration.html');
});

// Handle form submissions
app.post('/register', async (req, res) => {
  const { username, email, password } = req.body;

  // Create a new user
  const newUser = new User({
    username,
    email,
    password
  });

  try {
    // Save the user to the database
    await newUser.save();
    res.send('Registration successful!');
  } catch (error) {
    res.status(500).send('Error registering user.');
  }
});

// Start the server
app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
