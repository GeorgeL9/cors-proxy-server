const express = require('express');
const { createProxyMiddleware } = require('http-proxy-middleware');
const cors = require('cors');

const app = express();

// Use cors middleware to handle cors
app.use(cors());

// Get the base API URL from the command-line arguments
const API_SERVICE_URL = process.argv[2];
if (!API_SERVICE_URL) {
    console.error('Base API URL is required as the first argument.');
    process.exit(1);
}

// Get the port number from the command-line arguments or set it to the default value
const PORT = process.argv[3] || 3000;

// Proxy configuration
app.use('/api', createProxyMiddleware({
    target: API_SERVICE_URL,
    changeOrigin: true,
    pathRewrite: {
        [`^/api`]: '', // remove the /api prefix when forwarding the request
    },
}));

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
    console.log(`Proxying to API service at ${API_SERVICE_URL}`);
});