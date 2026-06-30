const { v7: uuidV7 } = require('uuid');

class Band {
    constructor(name = 'no-name') {
        this.id = uuidV7();
        this.name = name;
        this.votes = 0;
    }
}

module.exports = Band;