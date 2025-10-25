
const express = require('express');
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

app.use("/uploads", express.static("uploads"));

app.listen(3000, () => {
    console.warn('API listening on port 3000');
});

module.exports = app;
