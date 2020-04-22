const Web3 = require("web3");
const web3 = new Web3();

/**
 * Refreshes provider instance and attaches even handlers to it
 */
function refreshProvider(web3Obj, providerUrl) {
    let retries = 0;

    function retry(event) {
        if (event) {
            console.log('Web3 provider disconnected or errored.');
            retries += 1;

            if (retries > 5) {
                console.log(`Max retries of 5 exceeding: ${retries} times tried`);
                return setTimeout(() => refreshProvider(web3Obj, providerUrl), 5000);
            }
        } else {
            console.log(`Reconnecting web3 provider ${providerUrl}`);
            refreshProvider(web3Obj, providerUrl)
        }

        return null
    }

    const provider = new Web3.providers.WebsocketProvider(providerUrl);

    provider.on("connect", () => {
        console.log("*** WebSocket Connected ***")
        watchBlocks(web3Obj);
    })
    provider.on("error", (e) => {
        console.log("*** WebSocket Error ***:\n", e)
        retry(e);
    })
    provider.on("end", (e) => {
        console.log("*** WebSocket Ended ***")
        setTimeout(() => refreshProvider(web3Obj, providerUrl), 5000);
    })
    provider.on("close", (e) => {
        console.log("*** WebSocket Closed ***")
        refreshProvider(web3Obj, providerUrl);
    })
    provider.on("timeout", (e) => {
        console.log("*** WebSocket Timeout ***")
        retry(e);
    })
    provider.on("exit", (e) => {
        console.log("*** WebSocket Exit ***")
        refreshProvider(web3Obj, providerUrl);
    })

    web3Obj.setProvider(provider);
    console.log('New Web3 provider initiated');

    return provider
}

function watchBlocks(web3Socket) {
    let timerId = null;
    const subscription = web3Socket.eth.subscribe('newBlockHeaders')
        .on('data', (blockHeader) => {
            if (timerId) clearTimeout(timerId);
            timerId = setTimeout(() => {
                refreshProvider(web3Socket, 'wss://ropsten.infura.io/ws/v3/e7e50056370b47e0b71bdbc746887727');
            }, 60000)
        }).on('error', (error) => {
            console.error("Error on newBlockHeaders:", error);
        });
}

refreshProvider(web3, 'wss://ropsten.infura.io/ws/v3/e7e50056370b47e0b71bdbc746887727');

module.exports = web3;
