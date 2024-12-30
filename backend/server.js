const express = require('express');
const app = express();
const apiRoutes = require('./routes/api');

app.use('/api', apiRoutes);

app.listen(5000, () => console.log('Server running on port 5000'));