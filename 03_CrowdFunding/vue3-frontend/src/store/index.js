import { createStore } from 'vuex'
import Web3 from 'web3'
// import ProjectFactory from './../build/contracts/ProjectFactory.json'
// import CrowdFunding from './../build/contracts/CrowdFunding.json'

export default createStore({
  state: {
    isMetaMask: false,
    defaultAccount: '',
    networkId: '',
    error: '',
    isLoading: false,
  },
  mutations: {
    setLoading(state, payload) {
      state.isLoading = payload
    },
    setError(state, payload) {
      state.error = payload
    },
    clearError(state) {
      state.error = null
    },
    setIsMetaMask(state, payload) {
      state.isMetaMask = payload
    },
    setDefaultAccount(state, payload) {
      state.defaultAccount = payload
    },
    setNetworkId(state, payload) {
      state.networkId = payload
    },
  },
  actions: {
    isMetaMaskInstalled({ commit }) {
      let provider = window.ethereum
      if (typeof provider !== 'undefined') {
        commit('setIsMetaMask', provider.isMetaMask)
        commit('setNetworkId', provider.networkVersion)
      } else {
        commit(
          'setError',
          'Please install MetaMask to interact with this DApp!'
        )
      }
    },
    async onClickConnect({ commit }) {
      let provider = window.ethereum
      let web3 = new Web3(provider)
      console.log(web3)
      try {
        commit('setLoading', true)
        commit('clearError')
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
        commit('setDefaultAccount', accounts[0])
        commit('setLoading', false)
      } catch (err) {
        commit('setError', err.message)
      }
    },
    clearError({ commit }) {
      commit('clearError')
    },
  },
  getters: {
    getMetaMaskState(state) {
      return state.isMetaMask
    },
    getDefaultAccount(state) {
      return state.defaultAccount
    },
    getNetworkId(state) {
      return state.networkId
    },
    getLoading(state) {
      return state.isLoading
    },
    getError(state) {
      return state.error
    },
  },
  modules: {},
})
