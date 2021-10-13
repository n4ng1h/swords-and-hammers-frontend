const path = require('path');
const express = require('express');

const PORT = process.env.PORT || 3000;

// For the Express server
const app = express();

// To get Node to serve our static files in the build directory
app.use(express.static(path.resolve(__dirname, '../build')));

// To send all other unhandled requests to return the web application
app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
});

app.listen(PORT, () => {
  console.log(`Web server running on port: ${PORT}`);
});
