const express = require("express");
const { connect } = require("./create_test_data");
const app = express();
const testDataRoutes = require("./routes/TestDataRoutes");
const userRoutes = require("./routes/UserRoutes");
const gameRoutes = require("./routes/GameRoutes");
const boardRoutes = require("./routes/BoardRoutes");
const roomRoutes = require("./routes/RoomRoutes");
const apiRootPath = "/api/v1";

app.use(express.json());
app.use(express.static("build"));

// Connect to postgres
connect();

// Use the Routes
app.use(`${apiRootPath}/testdata`, testDataRoutes);
app.use(`${apiRootPath}/user`, userRoutes);
app.use(`${apiRootPath}/games`, gameRoutes);
app.use(`${apiRootPath}/board`, boardRoutes);
app.use(`${apiRootPath}/rooms`, roomRoutes);
const PORT = 3000;

app.listen(PORT, () => {
  console.log(`Listenning to ${PORT}`);
});
