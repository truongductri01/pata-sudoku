const express = require("express");
const app = express();

app.use(express.static("build"));

const PORT = 3000;
app.listen(PORT, () => {
  console.log(`Listenning to ${PORT}`);
});
