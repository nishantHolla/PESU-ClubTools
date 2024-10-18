const express = require("express");
const cors = require("cors");
const v1 = require("./routes/v1");

const app = express();
const port = process.env.PORT || 4000

app.use(
  cors({
    origin: "http://localhost:5173",
  }),
);
app.use(express.json());
app.use("/api/v1", v1);

app.listen(port, () => {
  console.log(`Server is running in port ${port}...`);
});
