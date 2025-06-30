class BroadcastService {
    constructor() {
        this.io = () => BroadcastService.serverio;
    }

    static setup(serverio) {
        BroadcastService.serverio = serverio;
    }

    emit(event, data) {
        this.io().emit(event, data);
    }    
};

module.exports = { BroadcastService };
