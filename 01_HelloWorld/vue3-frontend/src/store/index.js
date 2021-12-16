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
        if (window.ethereum) {
            window.web3 = new Web3(window.ethereum)
            await window.ethereum.enable()
          }
          else if (window.web3) {
            window.web3 = new Web3(window.web3.currentProvider)
          }
          else {
           console.log('Need to install MetaMask!')
          }
    },
    async getContractData() {
        state.isLoading = true
        const web3js = window.web3
        const getAccounts = await web3.eth.getAccounts()
        // console.log(getAccounts)
        state.defaultAccount = getAccounts[0]
        const networkId = await web3js.eth.net.getId()
        const networkData = HelloWorld.networks[networkId]
        if(networkData) {
            const helloWorld = new web3.eth.Contract(HelloWorld.abi, networkData.address)
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
            console.log(receipt)
            state.loading = false
            window.location.reload()
        })
    }
}

export default {
    state,
    methods
}
