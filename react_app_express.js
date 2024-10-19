const express = require('express');
const https = require('https');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 443;//process.env.PORT || 3000;

// Load SSL certificate and key
const options = {
  key: fs.readFileSync('/etc/letsencrypt/live/tinocaffeine.com/privkey.pem'),
  cert: fs.readFileSync('/etc/letsencrypt/live/tinocaffeine.com/fullchain.pem'),
};

// Serve static files from the React app
app.use(express.static(path.join(__dirname, '/tinocaffeine/tino/build')));

// Route for serving the React app
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '/tinocaffeine/tino/build', 'index.html'));
});

// Start the server
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });

// Start the HTTPS server
https.createServer(options, app).listen(PORT, () => {
  console.log(`Server is running on https://tinocaffeine.com`);
});