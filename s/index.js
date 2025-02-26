const express = require('express');
const cors = require('cors');
const { createProxyMiddleware } = require('http-proxy-middleware');

const app = express();
app.use(cors());

// Simple logging to check incoming requests
app.use((req, res, next) => {
  console.log('Received request:', req.method, req.url);
  next();
});

// Function to process input URL
function getTargetURL(input) {
  try {
    const decodedInput = decodeURIComponent(input);
    const url = new URL(`http://${decodedInput}`);
    if (url.hostname.includes(".")) return url.toString();
  } catch (err) {
    console.error("Error processing URL:", err);
  }
  return `https://www.google.com/search?q=${encodeURIComponent(input)}`;
}

// Handle proxy requests on "/proxy"
app.use('/proxy', (req, res, next) => {
  const { q } = req.query;
  if (!q) return res.status(400).send('No query provided.');

  const targetURL = getTargetURL(q);
  console.log("Proxying request to:", targetURL);

  // Set up the proxy middleware
  createProxyMiddleware({
    target: targetURL,
    changeOrigin: true,
    followRedirects: true,
  })(req, res, next);
});

// Home route to verify the server is working
app.get('/', (req, res) => {
  res.send('Proxy is running!');
});

module.exports = app;  // Export for Vercel
