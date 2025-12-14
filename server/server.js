const express = require('express');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 3000;

// Middleware
app.use(bodyParser.json());
app.use(cors({
  origin: 'https://birthday-rose-delta.vercel.app', // Thay bằng URL Vercel của bạn
  methods: ['GET', 'POST']
}));

// Serve static files from the "public" directory
app.use(express.static(path.join(__dirname, '../public')));

// In-memory storage for gift selections
let giftSelections = [];

// API to get all gift selections
app.get('/gifts', (req, res) => {
  res.json(giftSelections);
});

// API to save a gift selection
app.post('/gifts', (req, res) => {
  const { id, label, brand } = req.body;
  const existingGift = giftSelections.find(gift => gift.id === id);

  if (existingGift) {
    existingGift.label = label;
    existingGift.brand = brand;
  } else {
    giftSelections.push({ id, label, brand });
  }

  res.status(200).json({ message: 'Gift selection saved successfully!' });
});

// Catch-all route to serve the frontend
app.get('*', (req, res) => {
  res.sendFile(path.join(__dirname, '../public/index.html'));
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});