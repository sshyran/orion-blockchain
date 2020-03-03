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
                return setTimeout(refreshProvider, 5000)
            }
        } else {
            console.log(`Reconnecting web3 provider ${providerUrl}`);
            refreshProvider(web3Obj, providerUrl)
        }

        return null
    }

    const provider = new Web3.providers.WebsocketProvider(providerUrl);

    provider.on('end', () => retry());
    provider.on('error', () => retry());

    web3Obj.setProvider(provider);

    console.log('New Web3 provider initiated');

    return provider
}


refreshProvider(web3, 'wss://ropsten.infura.io/ws/v3/e7e50056370b47e0b71bdbc746887727');

module.exports = web3;
