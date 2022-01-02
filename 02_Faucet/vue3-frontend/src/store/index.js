import { reactive } from "vue"
import Web3 from "web3"
import Faucet from "./../build/contracts/Faucet.json"

const state = reactive({
  ownerAddress: "",
  contractAddress: "",
  contractBalance: "",
  contractData: "",
  currentAccount: "",
  error: "",
  isLoading: false,
})

const methods = {
  async connectBlockchain() {
    let provider = window.ethereum
    if (typeof provider !== "undefined") {
      provider
        .request({ method: "eth_requestAccounts" })
        .then((accounts) => {
          state.currentAccount = accounts[0]
        })
        .catch((err) => {
          state.error = err.message
          return
        })
      window.ethereum.on("accountsChanged", function (accounts) {
        state.currentAccount = accounts[0]
      })
    } else {
      console.log("Need to install MetaMask")
      state.error = "Please install MetaMask browser extension to interact"
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
    const networkData = Faucet.networks[networkId]
    if (networkData) {
      const faucet = new web3js.eth.Contract(Faucet.abi, networkData.address)
      state.contractData = faucet
      // const message = await helloWorld.methods.retrieve().call()
      // const message = await helloWorld.methods.message().call()
      // state.message = message
      state.isLoading = false
    } else {
      state.error = "contract not deployed to detected network."
      state.isLoading = false
    }
  },
}

export default {
  state,
  methods,
}
