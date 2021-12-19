import { reactive } from 'vue'
import Web3 from 'web3'
import HelloWorld from './../build/contracts/HelloWorld.json'

const state = reactive({
    message: '',
    contractData: '',
    defaultAccount: '',
    error: '',
    isLoading: false
})

const methods = {
    async connectBlockchain() {
        // if (window.ethereum) {
        //     window.web3 = new Web3(window.ethereum)
        //     await window.ethereum.enable()
        //   }
        //   else if (window.web3) {
        //     window.web3 = new Web3(window.web3.currentProvider)
        //   }
        //   else {
        //    console.log('Need to install MetaMask!')
        //   }
        // if (window.ethereum && window.ethereum.isMetaMask) {
		// 	window.ethereum.request({ method: 'eth_requestAccounts'})
		// 	.then(result => {
        //         state.defaultAccount = result[0]
		// 	})
		// 	.catch(error => {
        //         state.error = error.message
			
		// 	})

        //     } else {
        //         console.log('Need to install MetaMask')
        //         state.error = 'Please install MetaMask browser extension to interact'
        //     }
        let provider = window.ethereum;
        if (typeof provider !== 'undefined') {
            provider
                .request({ method: 'eth_requestAccounts' })
                .then((accounts) => {
                    state.defaultAccount = accounts[0]
                })
                .catch((err) => {
                    state.error = err.message
                    return
                })
            window.ethereum.on('accountsChanged', function (accounts) {
                state.defaultAccount = accounts[0]
            })
        } else {
			console.log('Need to install MetaMask')
			state.error = 'Please install MetaMask browser extension to interact'
		}
    },
    async getContractData() {
        state.isLoading = true
        let provider = window.ethereum
        const web3js = new Web3(provider)
        // const getAccounts = await web3.eth.getAccounts()
        // // console.log(getAccounts)
        // state.defaultAccount = getAccounts[0]
        const networkId = await web3js.eth.net.getId()
        const networkData = HelloWorld.networks[networkId]
        if(networkData) {
            const helloWorld = new web3js.eth.Contract(HelloWorld.abi, networkData.address)
            state.contractData = helloWorld
            const message = await helloWorld.methods.retrieve().call()
            // const message = await helloWorld.methods.message().call()
            state.message = message
            state.isLoading = false
          } else {
            state.error = 'contract not deployed to detected network.'
            state.isLoading = false
          }
    },
    storeMessage(message) {
        state.loading = true
        state.contractData.methods.store(message).send({ from: state.defaultAccount })
        .once('receipt', (receipt) => {
            // do something
        })
        state.contractData.events.onMessageUpdate().on("data", function(event) {
            let message = event.returnValues
            state.message = message.updatedMessage
        }).on("error", console.error)
        state.loading = false
    }
}

export default {
    state,
    methods
}
