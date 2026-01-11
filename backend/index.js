const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
const sequelize = require('./config/db');
const jobRoutes = require('./routes/jobRoutes');

const app = express();
app.use(cors());
app.use(bodyParser.json());

app.use('/api', jobRoutes);

sequelize.sync().then(() => {
    app.listen(5000, () => console.log('Server running on http://localhost:5000'));
});
