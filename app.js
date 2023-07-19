// app.js (main server file)

const express = require('express');
const bodyParser = require('body-parser');
const app = express();

// Middleware
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// Database setup (e.g., MongoDB)
const mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/spotify_family_pool', {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

// User schema
const userSchema = new mongoose.Schema({
  email: { type: String, unique: true },
  password: { type: String },
});

const User = mongoose.model('User', userSchema);

// Registration endpoint
app.post('/register', async (req, res) => {
  try {
    const { email, password } = req.body;

    // Validate if email is unique (you can add more validation steps here)
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(409).json({ error: 'Email already registered' });
    }

    // Save the new user to the database
    const newUser = new User({ email, password });
    await newUser.save();

    // Redirect to the Spotify landing page upon successful registration
    return res.redirect('https://www.spotify.com/');
  } catch (error) {
    console.error('Error during registration:', error);
    return res.status(500).json({ error: 'Something went wrong' });
  }
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});
