const { io } = require("socket.io-client");
const AnimationFrame = require("./client/classes/AnimationFrame");
const GameImage = require("./client/classes/GameImage");
const GamePlayer = require("./client/classes/GamePlayer");
const KeyBoardPlayer = require("./client/classes/KeyBoardPlayer");
const socket = io(`http://localhost:${3002}`);

const gameImageData = [
  {
    role: "background",
    src: "./assets/PC Computer - Among Us - Dropship Lobby.png",
    alt: "ship background",
    xSource: 10,
    ySource: 15,
    sourceWidth: 1220,
    sourceHeight: 980,
    xDest: 200,
    yDest: 150,
    destWidth: 1220 / 2,
    destHeight: 980 / 2,
  },
];

const drawGame = () => {
  const mainCanvas = document.getElementById("mainCanvas");
  const ctx = mainCanvas.getContext("2d");
  const gameImages = [];
  gameImageData.forEach(({ role, src, alt, name, id, ...imageData }) => {
    const image = new Image();
    image.src = src;
    image.alt = alt;
    if (role === "player") {
      gameImages.push({
        gamePlayer: new GamePlayer(
          name,
          id,
          image,
          ...Object.values(imageData)
        ),
      });
    } else {
      gameImages.push({
        gameImage: new GameImage(image, ...Object.values(imageData)),
      });
    }
  });

  const keyBoardPlayer = new KeyBoardPlayer();
  new AnimationFrame().refreshFrame(gameImages, ctx, keyBoardPlayer);
};

socket.on("server:player:new", (data) => {
  gameImageData.push({
    ...data,
    role: "player",
    src: "./assets/Base/idle.png",
    alt: "player images",
    xSource: 10,
    ySource: 10,
    sourceWidth: 165,
    sourceHeight: 211,
    xDest: 400,
    yDest: 400,
    destWidth: 165 / 3.5,
    destHeight: 211 / 3.5,
  });
  drawGame();
});

window.addEventListener("DOMContentLoaded", drawGame);