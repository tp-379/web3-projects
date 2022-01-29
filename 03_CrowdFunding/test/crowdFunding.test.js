const CrowdFunding = artifacts.require('CrowdFunding')
const ProjectFactory = artifacts.require('ProjectFactory')

contract('CrowdFunding', () => {
  let crowdFunding
  let projectFactory
  let accounts

  before(async () => {
    crowdFunding = await CrowdFunding.deployed()
    projectFactory = await ProjectFactory.deployed()
    accounts = await web3.eth.getAccounts()
  })

  it('project factory gets deployed', async () => {
    const factoryAddress = projectFactory.address
    assert.notEqual(factoryAddress, 0x0)
    assert.notEqual(factoryAddress, '')
    assert.notEqual(factoryAddress, null)
    assert.notEqual(factoryAddress, undefined)
  })

  it('crowd funding gets deployed', async () => {
    const crowdFundingAddress = crowdFunding.address
    assert.notEqual(crowdFundingAddress, 0x0)
    assert.notEqual(crowdFundingAddress, '')
    assert.notEqual(crowdFundingAddress, null)
    assert.notEqual(crowdFundingAddress, undefined)
  })

  it('has a manager', async () => {
    const manager = await crowdFunding.manager()
    // console.log(manager)
    assert.notEqual(manager, 0x0)
    assert.notEqual(manager, '')
    assert.notEqual(manager, null)
    assert.notEqual(manager, undefined)
  })

  it('sets deployer as manager', async () => {
    const deployer = accounts[0]
    const manager = await crowdFunding.manager()
    assert.equal(deployer, manager)
  })
})
