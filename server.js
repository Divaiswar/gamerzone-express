<<<<<<< HEAD
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
=======
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
require('dotenv').config();

const app = express();
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected 🚀"))
  .catch(err => console.error("MongoDB Error ❌", err));

app.use(express.static(__dirname));

// Schema for orders
const OrderSchema = new mongoose.Schema({
  game: String,
  deliveryType: String,
  feedback: String,
  rating: Number,
  date: { type: Date, default: Date.now }
});

const Order = mongoose.model('orders', OrderSchema);

// Save order API
app.post('/save-order', async (req, res) => {
  try {
    const newOrder = new Order(req.body);
    await newOrder.save();
    res.json({ message: "Order saved successfully!" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save order" });
  }
});

// Load index.html
app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, "Index.html"));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`Server running on port ${port}`));
>>>>>>> 89cc6e5ca174e0e4b21f42023fa1c83355cb9a1e
