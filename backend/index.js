const express = require('express');
const ProductRoute = require('./routes/ProductRoute.js');
const OrderRoute = require('./routes/OrderRoute.js');
const dotenv = require('dotenv');
const connectdb = require('./config/db');
const app = express();
const cors = require('cors');

app.use(cors());
app.use(express.json());
dotenv.config();

connectdb();

app.use("/api/products", ProductRoute);
app.use("/api/orders", OrderRoute);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
