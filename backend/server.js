const express = require("express");
var cors = require('cors');

const app = express();
const port = 3000;

app.use(cors());

app.get('/ping', (req, res) => {
  return res.status(200).send({message: "Hello"});
})

app.listen(port, () => {
  console.log(`Server is running on port ${port}...`)
})
