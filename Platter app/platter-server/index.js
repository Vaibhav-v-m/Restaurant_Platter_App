const express = require('express');
const cors = require('cors'); // Import the cors package

const app = express();

// Use the cors middleware to enable CORS
app.use(cors());

// Define your API routes here
app.get('/restaurants', (req, res) => {
  // Your code to handle the /restaurants route
  // ...
});

// Start your server
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
