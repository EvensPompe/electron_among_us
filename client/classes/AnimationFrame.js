module.exports = class AnimationFrame {
    refreshFrame(gameImages, ctx, keyBoardPlayer) {
        const frame = (time) => {
            ctx.clearRect(0, 0, mainCanvas.width, mainCanvas.height);
            ctx.fillStyle = "grey";
            ctx.font = "40px serif";
            ctx.fillText("Among uuuuuuuuuuuuuuuuus", 300, 100);
            keyBoardPlayer.keyPressEvent();
            gameImages.forEach((gameImage) => {
                if (gameImage.hasOwnProperty("gamePlayer")) {
                    const { _initxDest, _inityDest } = gameImage.gamePlayer.getCoordDest();
                    ctx.fillStyle = "white";
                    ctx.font = "16px serif";
                    ctx.fillText(gameImage.gamePlayer._name, _initxDest + 10, _inityDest - 10);
                    gameImage.gamePlayer.move(keyBoardPlayer.keysPressed);
                } else {
                    gameImage.gameImage.displayImage();
                }
            });
            requestAnimationFrame(frame);
        }
        requestAnimationFrame(frame);
    }
}