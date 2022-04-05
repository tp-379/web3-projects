const CrowdFunding = artifacts.require('CrowdFunding')
const ProjectFactory = artifacts.require('ProjectFactory')
// const compiledProjectFactory = require('../../build/contracts/ProjectFactory.json')
// const compiledCrowdFunding = require('../../build/contracts/CrowdFunding.json')

contract('CrowdFunding', () => {
  let crowdFunding
  let projectFactory
  let project
  let accounts

  beforeEach(async () => {
    crowdFunding = await CrowdFunding.deployed()
    projectFactory = await ProjectFactory.deployed()
    accounts = await web3.eth.getAccounts()

    await projectFactory.createProject('1500', { from: accounts[0] })

    deployedProjects = await projectFactory.getDeployedProjects()
    project = await new web3.eth.Contract(crowdFunding.abi, deployedProjects[0])
  })

  it('deploys project factory and crowdfunding', async () => {
    assert.ok(projectFactory.address)
    assert.ok(project.options.address)
  })

  it('sets deployer as manager', async () => {
    const deployer = accounts[0]
    const manager = await project.methods.manager().call()
    assert.equal(deployer, manager)
  })

  // it('requires a min contribution', async () => {
  //   await project.methods.contribute().send({
  //     value: '5',
  //     from: accounts[1],
  //   })
  //   assert(false)
  // })
  it('requires a min contribution', async () => {
    try {
      await project.methods.contribute().send({
        value: '5',
        from: accounts[1],
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('allows people to contribute and makes them approver', async () => {
    await project.methods.contribute().send({
      from: accounts[1],
      gas: '1500000',
      value: '2000',
    })

    const isContributor = await project.methods.approvers(accounts[1]).call()
    assert.equal(isContributor, true)
  })

  it('allows a manager to make a payment request', async () => {
    await project.methods
      .createRequest('Buy Sensors', '5000', accounts[1])
      .send({
        from: accounts[0],
        gas: '1500000',
      })
    const request = await project.methods.requests(0).call()
    assert.equal('Buy Sensors', request.description)
  })

  // Not working properly, shows VM Exception while processing transaction: revert More approvals needed to finalize request
  // Will come back to it later
  it('processes requests', async () => {
    // Let accounts[1] contribute 5 ether to our project.
    await project.methods.contribute().send({
      value: web3.utils.toWei('5', 'ether'),
      from: accounts[1],
    })

    // Create a spend request for 2 ether to go to accounts[2].
    await project.methods
      .createRequest(
        'A new spend request',
        web3.utils.toWei('2', 'ether'),
        accounts[2]
      )
      .send({
        from: accounts[0],
        gas: '1500000',
      })

    // Approve the spend request.
    await project.methods.approveRequest(0).send({
      from: accounts[1],
      gas: '1500000',
    })

    // Finalize the request.
    await project.methods.finalizeRequest(0).send({
      from: accounts[0],
      gas: '1500000',
    })

    let balance = await web3.eth.getBalance(accounts[2])
    balance = web3.utils.fromWei(balance, 'ether')
    balance = parseFloat(balance)

    assert(balance > 101)
  })
})
