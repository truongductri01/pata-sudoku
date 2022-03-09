const axios = require("axios");
const SudokuApiBase = "https://sugoku.herokuapp.com";

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

const validateBoard = async (board) => {
    if (board) {
        const data = {
          board,
        };
        return await axios
          .post(`${SudokuApiBase}/validate`, encodeParams(data), {
            "Content-Type": "application/x-www-form-urlencoded",
          }).then((response) => response.data).catch(() => null);
      } else {
        return null;
      }
}

const generateBoard = async (difficulty) => {
    return await axios
      .get(`${SudokuApiBase}/board?difficulty=${difficulty}`)
      .then((res) => res.data.board).catch(() => null);
}


const sudokuFunctions = {validateBoard, generateBoard};
module.exports = sudokuFunctions;