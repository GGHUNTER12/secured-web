// api/proxy.js

import { createProxyMiddleware } from 'http-proxy-middleware';

export default function handler(req, res) {
  return createProxyMiddleware({
    target: 'https://example.com',  // Change this to your target site
    changeOrigin: true,
    pathRewrite: {
      '^/proxy': '',  // Optional: Remove '/proxy' from the URL
    },
  })(req, res);
}
