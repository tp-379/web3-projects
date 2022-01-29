import { reactive } from 'vue'

const state = reactive({
  isMetaMask: false,
  defaultAccount: '',
  networkId: '',
  web3: null,
  error: '',
  isLoading: false,
})

const methods = {
  // checking if metamask is installed
  isMetaMaskInstalled() {
    let provider = window.ethereum
    if (typeof provider !== 'undefined') {
      state.isMetaMask = provider.isMetaMask
      state.networkId = provider.networkVersion
      // state.web3 = new Web3(provider)
    } else {
      state.error =
        'Please install MetaMask to interact with the DApp!                                 '
    }
  },

  // connect to Metamask
  async onClickConnect() {
    let provider = window.ethereum
    try {
      state.isLoading = true
      state.error = ''
      const accounts = await provider
        .request({
          method: 'wallet_requestPermissions',
          params: [
            {
              eth_accounts: {},
            },
          ],
        })
        .then(() =>
          ethereum.request({
            method: 'eth_requestAccounts',
          })
        )
      state.defaultAccount = accounts[0]
      state.isLoading = false
    } catch (error) {
      state.error = error.message
    }
  },

  //get account balance
  async getAccountBalance() {
    console.log('getAccountBalance')
  },
}

export default {
  state,
  methods,
}
