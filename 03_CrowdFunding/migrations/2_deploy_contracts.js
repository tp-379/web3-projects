const CrowdFunding = artifacts.require('CrowdFunding')

module.exports = function (deployer, network, accounts) {
  deployer.deploy(CrowdFunding, web3.utils.toWei('1', 'ether'), accounts[0])
}
