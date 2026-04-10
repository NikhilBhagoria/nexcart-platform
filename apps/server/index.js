const express = require("express");

const app = express();

// Middleware
app.use(express.json());

// Route
app.get("/", (req, res) => {
  res.send("Backend is running 🚀");
});

// Server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});