const CrowdFunding = artifacts.require('CrowdFunding')
const ProjectFactory = artifacts.require('ProjectFactory')

module.exports = function (deployer, network, accounts) {
  deployer.deploy(ProjectFactory)
  deployer.deploy(CrowdFunding, web3.utils.toWei('1', 'ether'), accounts[0])
}
