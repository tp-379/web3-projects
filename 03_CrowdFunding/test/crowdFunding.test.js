const CrowdFunding = artifacts.require('CrowdFunding')

contract('CrowdFunding', () => {
  it('should deploy smart contract properly', async () => {
    const crowdFunding = await CrowdFunding.deployed()
    console.log(crowdFunding.address)
    assert.ok(crowdFunding.address)
  })
})
