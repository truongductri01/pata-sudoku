const express = require("express");
const { getGameWithId } = require("../create_test_data");
const router = express.Router();

router.get("/info/:gameId", (req, res) => {
  const gameId = req.params.gameId;
  if (gameId) {
    getGameWithId(gameId).then((poolRes) => {
      if (poolRes.rowCount === 1) {
        res.json(poolRes.rows[0]);
      } else {
        res.status(404).send();
      }
    });
  } else {
    res.status(400).send();
  }
});

module.exports = router;
