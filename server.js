const express = require('express');

const app = express();

const morgan = require('morgan');

const cors = require('cors');

require('dotenv').config();

const {
  PORT
} = process.env;

// Middlewares
app.use(cors());
app.use(morgan('dev'));
app.use(express.json());

// app.get('/', (req, res) => {
//   res.json({
//     message:'Hello,World!',
//   });
// });

app.use('/api/auth', require('./API/auth'));
app.use('/api/message', require('./API/message'));


const port = PORT;
app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`);
});