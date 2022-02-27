const express = require("express");
const axios = require("axios");
const router = express.Router();

// Code using Sudoku api from: https://github.com/bertoort/sugoku

const encodeBoard = (board) =>
  board.reduce(
    (result, row, i) =>
      result +
      `%5B${encodeURIComponent(row)}%5D${i === board.length - 1 ? "" : "%2C"}`,
    ""
  );

const encodeParams = (params) =>
  Object.keys(params)
    .map((key) => key + "=" + `%5B${encodeBoard(params[key])}%5D`)
    .join("&");

router.get("/solve", async (req, res) => {
  const board = req.body.board;
  if (board) {
    const data = {
      board,
    };

    await axios
      .post("https://sugoku.herokuapp.com/solve", encodeParams(data), {
        "Content-Type": "application/x-www-form-urlencoded",
      })

      .then((response) => res.json(response.data))
      .catch((e) => res.status(500).send(e));
  } else {
    res.status(400).send("No board received");
  }
});

router.get("/validate", async (req, res) => {
  const board = req.body.board;
  if (board) {
    const data = {
      board,
    };

    await axios
      .post("https://sugoku.herokuapp.com/validate", encodeParams(data), {
        "Content-Type": "application/x-www-form-urlencoded",
      })
      .then((response) => {
        res.contentType = "application/json";
        res.json(response.data);
      })
      .catch((e) => res.status(500).send(e));

    res.send();
  } else {
    res.status(400).send("No board received");
  }
});

module.exports = router;
