// Import the Express module
const express = require('express');

// Create an Express application
const app = express();

// Define a route that responds with "Hello, World!"
app.get('/', (req, res) => {
    res.send('Hello, World!');
});

// Start the server on port 3000
const port = 3000;
app.listen(port, () => {
    console.log(`Server is listening on http://localhost:${port}`);
});
