const NamedToken = artifacts.require('NamedToken')

module.exports = function (deployer) {
  deployer.deploy(NamedToken)
}
