const express = require('express');
const path = require('path');
const app = express();

// Middleware to read JSON body
app.use(express.json());

// Serve the frontend (index.html and assets)
app.use(express.static(__dirname));

// Root Route - show HTML UI
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, 'index.html'));
});

// Receive order data + rating
app.post('/save-order', (req, res) => {
    console.log("Order Received:", req.body);
    return res.json({ message: "Order successful! 🚚🎮", status: "success" });
});

// Render must use its assigned PORT
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
