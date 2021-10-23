import dotenv from 'dotenv';
import mongoose from "mongoose";
dotenv.config({ path: '../config/.env' });
import app from './express.js';

import Template from './../template.js'


mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});
mongoose.connection.on('error', () => {
  throw new Error(`unable to connect to database: ${process.env.MONGO_URI}`);
});

app.get('/', (req, res) => {
    res.status(200).send(Template())
   })

app.listen(process.env.PORT, (err) => {
  if (err) {
    console.log(err);
  }
  console.info(`server started on port ${process.env.PORT}`);
});
