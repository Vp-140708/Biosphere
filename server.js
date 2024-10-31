const express = require('express');
const connectDB = require('./config/db');
const userRoutes = require('./routes/userRoutes');
const reviewRoutes = require('./routes/reviewRoutes');

const app = express();
connectDB();

app.use(express.json());

app.use('/api/users', userRoutes);
app.use('/api/reviews', reviewRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
    