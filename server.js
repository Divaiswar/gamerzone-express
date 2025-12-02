const express = require('express');
const path = require('path');
const app = express();

app.use(express.json());

// Serve index.html + related files
app.use(express.static(__dirname));

// When someone visits the site → show index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, "Index.html"));
});

// API to receive orders (button will send here)
app.post('/save-order', (req, res) => {
    console.log("Order data received:", req.body);
    res.json({ message: "Order placed successfully 🚚🎮" });
});

// Render uses this port automatically
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

