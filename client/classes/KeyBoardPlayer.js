module.exports = class KeyBoardPlayer {
    constructor() {
        this.keysPressed = [];
    }
    keyPressEvent() {
        document.addEventListener('keyup', (e) => {
            const keyName = e.key;
            const indexKey = this.keysPressed.indexOf(keyName);
            if (indexKey !== -1) {
                this.keysPressed.splice(indexKey, 1);
            }
        });

        document.addEventListener('keydown', (e) => {
            const keyName = e.key;
            if (!this.keysPressed.includes(keyName)) {
                this.keysPressed.push(keyName);
            }
        });
    }
}