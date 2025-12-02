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
