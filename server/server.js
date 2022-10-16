require('dotenv').config()
const express = require('express');
const cors = require('cors');
const morgan = require('morgan');

// routes
const endPointsRouter = require('./routes/endPointsRoutes');

// new express app
const app = express();

// only use this in dev to get description of http requests coming in
app.use(morgan('tiny'));

// middlewares
app.use(express.json());
app.use(cors());

// routes
app.use("/", endPointsRouter);

// listen for incoming requests
app.listen(process.env.PORT, () => {
    console.log('Listening on port 3000');
});