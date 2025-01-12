const express = require('express');
const authRoutes = require('./routes/authRoutes');
const bookRoutes = require('./routes/bookRoutes');
const authorRoutes = require('./routes/authorRoutes');
const uploadRoutes = require('./routes/uploadRoutes');

const app = express();
app.use(express.json());

app.use('/auth', authRoutes);
app.use('/api', bookRoutes);
app.use('/api', authorRoutes);
app.use('/api', uploadRoutes);

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
