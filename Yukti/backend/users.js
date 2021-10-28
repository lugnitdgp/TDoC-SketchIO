const users = [];

const addUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (name === "" || room === "") {
    return { error: `Username and/or room name is empty` };
  }

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: `Username is taken in room ${room}` };
  }

  if (name.length > 12) {
    return { error: `Username is too long` };
  }

  if (room.length > 150) {
    return { error: `Room name is too long` };
  }

  const turn = false;
  const hadPoints = false;
  const points = 0;
  const user = { id, name, room, turn, points, hadPoints };

  users.push(user);

  return { user };
};

// Update user
const updateUser = ({ id, name, room }) => {
  name = name.trim().toLowerCase();
  room = room.trim().toLowerCase();

  if (room.length > 150 || room == "") {
    return {
      error: `Room name cannot be updated in the waiting room (Close the window and join a new room)`,
    };
  }

  if (name === "") {
    return { error: `Username is empty` };
  }

  const existingUser = users.find(
    (user) => user.room === room && user.name === name
  );

  if (existingUser) {
    return { error: `Username is taken in room ${room}` };
  }

  if (name.length > 12) {
    return { error: `Username is too long (max 12 characters)` };
  }

  const turn = false;
  const hadPoints = false;
  const points = 0;
  const user = { id, name, room, turn, points, hadPoints };

  users.push(user);

  return { user };
};

// A function to change turn property of user (so every player in a room gets one turn each per round)
const changeTurn = (id, bool) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  user.turn = bool;
  users[index] = user;
  return;
};

// A function to remove a user when user leaves room
const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) {
    return users.splice(index, 1)[0];
  }
};

// A function to get user with id
const getUser = (id) => users.find((user) => user.id === id);

// A function to get all players in a room
const getUsersInRoom = (room) => users.filter((user) => user.room === room);

// A function to add points to a user
const addPoint = (id, point) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  user.points += point;
  users[index] = user;
  return;
};

// A function to reset points to 0 for a user
const resetPoint = (id) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  user.points = 0;
  user.hadPoints = false;
  users[index] = user;
  return;
};

// A function to change hadPoints property (so users cannot keep getting points when guessed right)
const changeHadPoints = (id) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  user.hadPoints = true;
  users[index] = user;
  return;
};

// A function to change hadPoints property to false when new game started
const resetHadPoints = (id) => {
  const index = users.findIndex((user) => user.id === id);
  const user = users[index];
  user.hadPoints = false;
  users[index] = user;
  return;
};

// A function to handle resetting points for each player in the room
const resetPoints = (room) => {
  const usersList = getUsersInRoom(room);
  usersList.map((user) => resetPoint(user.id));
  return;
};

// A function to reset the hadPoints property for each user
const resetPlayerHadPoints = (room) => {
  const usersList = getUsersInRoom(room);
  usersList.map((user) => resetHadPoints(user.id));
  return;
};

// A function to handle changing turn property for each user in the room
const resetPlayerTurns = (room) => {
  const usersList = getUsersInRoom(room);
  usersList.map((u) => changeTurn(u.id, false));
  return;
};

module.exports = {
  addUser,
  updateUser,
  removeUser,
  getUser,
  getUsersInRoom,
  changeTurn,
  addPoint,
  resetPoint,
  changeHadPoints,
  resetHadPoints,
  resetPoints,
  resetPlayerHadPoints,
  resetPlayerTurns,
};
