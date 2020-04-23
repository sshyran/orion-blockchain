const Web3 = require("web3");




class WsWeb3 extends Web3 {
    constructor(url, subscribe, unsubscribe) {
        super();
        this.url = url;
        this.subscribe = subscribe;
        this.unsubscribe = unsubscribe;
        this.refreshProvider();
    }

    /**
     * Refreshes provider instance and attaches even handlers to it
     */
    refreshProvider() {

        let retries = 0;
        const myself = this;

        function retry(event) {
            if (event) {
                console.log('Web3 provider disconnected or errored.');
                retries += 1;

                if (retries > 5) {
                    console.log(`Max retries of 5 exceeding: ${retries} times tried`);
                    return setTimeout(() => {
                        myself.refreshProvider
                    }, 5000);
                }
            } else {
                console.log(`Reconnecting web3 provider ${providerUrl}`);
                myself.refreshProvider();
            }

            return null
        }

        this.unsubscribe();
        const provider = new Web3.providers.WebsocketProvider(this.url);


        provider.on("connect", () => {
            console.log("*** WebSocket Connected ***")
            myself.subscribe();
        })
        provider.on("error", (e) => {
            console.log("*** WebSocket Error ***:\n", e)
            retry(e);
        })
        provider.on("end", (e) => {
            console.log("*** WebSocket Ended ***")
            setTimeout(() => {
                myself.refreshProvider()
            }, 5000);
        })
        provider.on("close", (e) => {
            console.log("*** WebSocket Closed ***")
            myself.refreshProvider();
        })
        provider.on("timeout", (e) => {
            console.log("*** WebSocket Timeout ***")
            retry(e);
        })
        provider.on("exit", (e) => {
            console.log("*** WebSocket Exit ***")
            myself.refreshProvider();
        })

        this.setProvider(provider);
        console.log('New Web3 provider initiated:', new Date());

        return provider
    }
}

module.exports = WsWeb3;
