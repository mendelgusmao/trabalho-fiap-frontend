const { Server } = require("socket.io");
    
let server;

function setupBroadcastService(serverInstance) {
    server = serverInstance;
};

class BroadcastService {
    constructor() {
        this.io = new Server(server, {
            cors: { origin: "*" },
        });
    }

    emit(event, data) {
      this.io.emit(event, data);
    }    
};

module.exports = { setupBroadcastService, BroadcastService };
