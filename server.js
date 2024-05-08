require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/dbConnect');
const statesRoutes = require('./routes/statesRoutes');

// Connect to Database
connectDB();

const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Routes
app.use('/states', statesRoutes);

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));