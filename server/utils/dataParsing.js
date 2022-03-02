// parsing function
const parseGameData = (gameData) => {
  const parsedGameData = {
    startTime: gameData["starttime"],
    endTime: gameData["endtime"],
    boardId: gameData["boardid"],
    playersIds: gameData["playersids"],
    winnerId: gameData["winnerId"],
    id: gameData["id"],
  };
  console.log(parsedGameData);
  return parsedGameData;
};
const parseRoomData = (roomData, gameData = null) => {
  const parsedRoomData = {
    id: roomData["id"],
    capacity: roomData["capacity"],
    gameId: roomData["gameid"],
    isHidden: roomData["ishidden"],
    canWitness: roomData["canwitness"],
    userIds: roomData["userids"],
  };
  if (gameData) {
    return { ...parsedRoomData, ...parseGameData(gameData) };
  }
  return parsedRoomData;
};

const dataParsingFunctions = { parseGameData, parseRoomData };
module.exports = dataParsingFunctions;
