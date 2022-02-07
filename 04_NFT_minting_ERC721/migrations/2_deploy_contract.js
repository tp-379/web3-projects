const ColorToken = artifacts.require('ColorToken')

module.exports = function (deployer) {
  deployer.deploy(ColorToken)
}
