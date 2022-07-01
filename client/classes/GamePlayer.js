// import GameImage from "./GameImage.js";
const GameImage = require('./GameImage.js');
let _initxDest = 400;
let _inityDest = 400;
const dirPath = "./assets/Base/walk/";
const dirPathReverse = "./assets/Base/walk/reverse/";
module.exports = class GamePlayer extends GameImage {
    constructor(name, id, img, xSource, ySource, sourceWidth, sourceHeight, xDest, yDest, destWidth, destHeight) {
        _initxDest = xDest;
        _inityDest = yDest;
        super(img, xSource, ySource, sourceWidth, sourceHeight, _initxDest, _inityDest, destWidth, destHeight)
        this._speed = 3;
        this._name = name;
        this._id = id;
        this._spriteNumber = 1;
        this._reverse = false;
    }
    move(keysPressed) {
        if (keysPressed.includes("ArrowUp")) {
            if (keysPressed.includes("ArrowRight")) {
                _initxDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowLeft")) {
                _initxDest -= this._speed / 2.5;
            }
            _inityDest -= this._speed;
        }
        if (keysPressed.includes("ArrowDown")) {
            if (keysPressed.includes("ArrowRight")) {
                _initxDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowLeft")) {
                _initxDest -= this._speed / 2.5;
            }
            _inityDest += this._speed;
        }

        if (keysPressed.includes("ArrowLeft")) {
            this._reverse = true;
            if (keysPressed.includes("ArrowDown")) {
                _inityDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowUp")) {
                _inityDest -= this._speed / 2.5;
            }
            _initxDest -= this._speed;
        }

        if (keysPressed.includes("ArrowRight")) {
            this._reverse = false;
            if (keysPressed.includes("ArrowDown")) {
                _inityDest += this._speed / 2.5;

            } else if (keysPressed.includes("ArrowUp")) {
                _inityDest -= this._speed / 2.5;
            }
            _initxDest += this._speed;
        }
        const isPressed = keysPressed.includes("ArrowUp")
            || keysPressed.includes("ArrowDown")
            || keysPressed.includes("ArrowLeft")
            || keysPressed.includes("ArrowRight");
        if (!isPressed) {
            this.displayImage(_initxDest, _inityDest);
        } else {
            this.displayMove(_initxDest, _inityDest)
        }
    }

    displayMove(newDestX, newDestY) {
        this._spriteNumber++;
        let maxSprite = 12;
        if (this._spriteNumber > maxSprite) {
            this._spriteNumber = 1;
        }
        const sprite = new Image();
        if (this._reverse) {
            sprite.src = this._spriteNumber > 9 ? `${dirPathReverse}Walk00${this._spriteNumber}.png` : `${dirPathReverse}Walk000${this._spriteNumber}.png`;
            sprite.alt = "sprite walk";
            this._ctx.drawImage(sprite, this._xSource, this._ySource, this._sourceWidth, this._sourceHeight, newDestX, newDestY, this._destWidth, this._destHeight);
        } else {
            sprite.src = this._spriteNumber > 9 ? `${dirPath}Walk00${this._spriteNumber}.png` : `${dirPath}Walk000${this._spriteNumber}.png`;
            sprite.alt = "sprite walk";
            this._ctx.drawImage(sprite, this._xSource, this._ySource, this._sourceWidth, this._sourceHeight, newDestX, newDestY, this._destWidth, this._destHeight);
        }
    }

    getCoordDest() {
        return { _initxDest, _inityDest };
    }
}