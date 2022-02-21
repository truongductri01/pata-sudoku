const express = require("express");
const app = express();
const {connect, createRoomTable, addRoomQuery} = require("./create_test_data.js");
app.use(express.static("build"));

connect().then(
    () => createRoomTable().then(
      () => addRoomQuery(2, "test", true, true, ["test1", "test2"])
    )
  );


const PORT = 3000;



app.listen(PORT, () => {
  console.log(`Listenning to ${PORT}`);
});
