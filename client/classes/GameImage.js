module.exports = class GameImage {
    constructor(img, xSource, ySource, sourceWidth, sourceHeight, xDest, yDest, destWidth, destHeight) {
        this._mainCanvas = document.getElementById('mainCanvas');
        this._ctx = mainCanvas.getContext('2d');
        this._img = img;
        this._xSource = xSource;
        this._ySource = ySource;
        this._sourceWidth = sourceWidth;
        this._sourceHeight = sourceHeight;
        this._xDest = xDest;
        this._yDest = yDest;
        this._destWidth = destWidth;
        this._destHeight = destHeight;
    }

    displayImage(newDestX = this._xDest, newDestY = this._yDest) {
        this._ctx.drawImage(this._img, this._xSource, this._ySource, this._sourceWidth, this._sourceHeight, newDestX, newDestY, this._destWidth, this._destHeight);
    }
}