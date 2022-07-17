const express = require('express');
const app = express();
const router = require('./routes');
const mongoose = require('mongoose');
require('dotenv').config();
const cookieParser = require('cookie-parser');

const PORT = process.env.PORT || 4000;


mongoose.connect(process.env.DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
});
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', () => {
    console.log('DB connected...');
});

app.use(cookieParser());
app.use(express.json());
app.use('/api', router);

app.listen(PORT, () => {
    console.log(`listening on port ${PORT}`);
})