const express = require("express");
const { connect } = require("./create_test_data");
const app = express();
const testDataRoutes = require("./routes/TestDataRoutes");
const userRoutes = require("./routes/UserRoutes");
const apiRootPath = "/api/v1";

app.use(express.json());
app.use(express.static("build"));

// Connect to postgres
connect();

// Use the Routes
app.use(`${apiRootPath}/testdata`, testDataRoutes);
app.use(`${apiRootPath}/user`, userRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listenning to ${PORT}`);
});
