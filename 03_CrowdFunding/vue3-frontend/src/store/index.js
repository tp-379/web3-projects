import { createStore } from 'vuex'
import projectFactoryInstance from './../utils/projectFactoryInstance'
// import crowdFundingInstance from './../utils/crowdFundingInstance'

export default createStore({
  state: {
    loadedProjects: [],
    isMetaMask: false,
    defaultAccount: '',
    networkId: '',
    error: '',
    isLoading: false,
  },
  mutations: {
    setLoadedProjects(state, payload) {
      state.loadedProjects = payload
    },
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
    async loadProjects({ commit }) {
      commit('setLoading', true)
      //code for loading projects
      let projects = await projectFactoryInstance.methods
        .getDeployedProjects()
        .call()
      if (projects.length > 0) {
        commit('setLoadedProjects', projects)
        commit('setLoading', false)
      } else {
        commit('setLoading', false)
        commit('setError', 'No projects found')
      }
    },
    // check if metamask is installed or not
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
      commit('setLoading', true)
      commit('clearError')
      try {
        const accounts = await window.ethereum
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
        commit('setLoading', false)
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
