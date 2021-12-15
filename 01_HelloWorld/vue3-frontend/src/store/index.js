import { reactive } from 'vue'
import Web3 from 'web3'

const state = reactive({
    message: 'Hello World',
    error: '',
    isLoading: false
})

const methods = {
    connectBlockchain() {
        // console.log('connect blockchain')
        const web3 = new Web3(Web3.givenProvider || "ws://localhost:7545");
        console.log(web3)
        // Checking if Web3 has been injected by the browser (Mist/MetaMask)
        // if (typeof web3 !== 'undefined') {
        //     // Use Mist/MetaMask's provider
        //     web3js = new Web3(web3.currentProvider)
        //     console.log("connected...")
        // } else {
        //     // Handle the case where the user doesn't have web3. Probably
        //     // show them a message telling them to install Metamask in
        //     // order to use our app.
        //     console.log("Web3 Provide not found, install Crypto wallet like Metamask to use ur dapp")
        // }
    },
    retrieveMessage() {
        state.message = 'New Hello'
    },
    storeMessage(message) {
        console.log('storing value: ', message)
    }

}

export default {
    state,
    methods
}
