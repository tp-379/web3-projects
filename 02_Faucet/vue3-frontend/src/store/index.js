import { reactive } from "vue"
import Web3 from "web3"
import Faucet from "./../build/contracts/Faucet.json"

const state = reactive({
  contractAddress: "",
  contractBalance: "",
  contractData: "",
  currentAccount: "",
  currentAccountBalance: "",
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
    const networkId = await web3js.eth.net.getId()
    const networkData = Faucet.networks[networkId]
    if (networkData) {
      const faucet = new web3js.eth.Contract(Faucet.abi, networkData.address)
      state.contractData = faucet

      // Get contract address byusing networkData
      // console.log(networkData.address)

      // Get contract address by using faucet.options
      const faucetAddress = faucet.options.address
      state.contractAddress = faucetAddress

      // Get the balance of the faucet contract and convert it to ETH
      await web3js.eth
        .getBalance(faucetAddress)
        .then((balance) => {
          state.contractBalance = web3js.utils.fromWei(balance)
        })
        .catch((err) => {
          console.log(err)
        })

      // Get the balance of the current account and convert it to ETH
      await web3js.eth
        .getBalance(state.currentAccount)
        .then((balance) => {
          state.currentAccountBalance = web3js.utils.fromWei(balance)
        })
        .catch((err) => {
          console.log(err)
        })

      state.isLoading = false
    } else {
      state.error = "contract not deployed to detected network."
      state.isLoading = false
    }
  },
  async withdrawETH() {
    state.isLoading = true
    const web3js = new Web3(window.ethereum)
    const faucet = state.contractData
    const amount = web3js.utils.toWei("0.5", "ether")
    await faucet.methods
      .withdraw(state.currentAccount, amount)
      .send({ from: state.currentAccount })
      .then((receipt) => {
        console.log(receipt)
        window.location.reload()
      })
      .catch((err) => {
        console.log(err)
      })
    // trying to fire events
    // faucet.events.Withdrawal().on("data", (event) => {
    //   console.log(event)

    // })
    state.isLoading = false
  },
}

export default {
  state,
  methods,
}
