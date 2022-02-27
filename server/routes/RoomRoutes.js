const express = require("express");
const { addRoomQuery } = require("../create_test_data");
const router = express.Router();

router.post("/create", (req, res) => {
  const { capacity, gameId, isHidden, canWitness } = req.body;
  if (capacity && gameId) {
    addRoomQuery(
      capacity,
      gameId,
      isHidden ? isHidden : false,
      canWitness ? canWitness : false,
      []
    )
      .then((response) => {
        console.log(response.command);
        res.send("Success");
      })
      .catch((e) => res.status(500).send(e));
  } else {
    res.status(400).send("Missing either capicity or gameId");
  }
});

module.exports = router;
