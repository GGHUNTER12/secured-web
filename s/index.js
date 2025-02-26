const express = require("express");
const cors = require("cors");
const { createProxyMiddleware } = require("http-proxy-middleware");

const app = express();
app.use(cors());

// Function to handle URL input
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

// Proxy route
app.use("/proxy", (req, res, next) => {
  const { q } = req.query;
  if (!q) return res.status(400).send("No query provided.");
  
  const targetURL = getTargetURL(q);
  console.log("Proxying request to:", targetURL);

  createProxyMiddleware({
    target: targetURL,
    changeOrigin: true,
    followRedirects: true,
  })(req, res, next);
});

// Home route to verify server is working
app.get("/", (req, res) => {
  res.send("Proxy is running!");
});

module.exports = app; // Export for Vercel
