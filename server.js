const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(express.json());
app.use(cors());

// MongoDB Connection
const uri = process.env.MONGODB_URI;
mongoose.connect(uri)
  .then(() => console.log("MongoDB Connected ✔"))
  .catch((err) => console.log("MongoDB Error ❌", err));

// Schema + Model
const orderSchema = new mongoose.Schema({
  name: String,
  email: String,
  rating: Number,
  feedback: String
});

const Order = mongoose.model("Order", orderSchema);

// Test route (optional)
app.get("/", (req, res) => {
  res.send("Server is working! 👍");
});

// Save data from frontend
app.post("/save-order", async (req, res) => {
  try {
    const data = new Order(req.body);
    await data.save();
    res.json({ success: true, message: "Order saved" });
  } catch (err) {
    res.json({ success: false, message: err.message });
  }
});

const port = process.env.PORT || 10000;
app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
