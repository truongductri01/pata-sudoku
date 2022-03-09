// Code using Sudoku api from: https://github.com/bertoort/sugoku
const SudokuApiBase = "https://sugoku.herokuapp.com";
const axios = require("axios");

const generateBoard = async (difficulty) => {
  if (
    difficulty &&
    ["easy", "medium", "hard", "random"].includes(difficulty.toLowerCase())
  ) {
    const board = await axios
      .get(`${SudokuApiBase}/board?difficulty=${difficulty}`)
      .then((res) => res.data.board);
    return board;
  } else {
    return null;
  }
};

const sudokuFunctions = { generateBoard };
module.exports = sudokuFunctions;
