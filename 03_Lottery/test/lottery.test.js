const Lottery = artifacts.require('Lottery')

contract('Lottery', function (accounts) {
  beforeEach(async () => {
    lottery = await Lottery.deployed()
  })

  it('should assert true', async function () {
    assert.ok(lottery.address)
  })

  it('allows one account to enter', async () => {
    await lottery.enter({
      from: accounts[0],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    const players = await lottery.getPlayers({
      from: accounts[0],
    })

    assert.equal(accounts[0], players[0])
    assert.equal(1, players.length)
  })

  it('allows multiple accounts to enter', async () => {
    await lottery.enter({
      from: accounts[1],
      value: web3.utils.toWei('0.02', 'ether'),
    })
    await lottery.enter({
      from: accounts[2],
      value: web3.utils.toWei('0.02', 'ether'),
    })
    await lottery.enter({
      from: accounts[3],
      value: web3.utils.toWei('0.02', 'ether'),
    })

    const players = await lottery.getPlayers({
      from: accounts[0],
    })

    assert.equal(accounts[1], players[1])
    assert.equal(accounts[2], players[2])
    assert.equal(accounts[3], players[3])
    assert.equal(4, players.length)
  })

  it('requires a minimum amount of ether to enter', async () => {
    try {
      await lottery.enter({
        from: accounts[0],
        value: 0,
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('only manager can call pickWinner', async () => {
    try {
      await lottery.pickWinner({
        from: accounts[1],
      })
      assert(false)
    } catch (err) {
      assert(err)
    }
  })

  it('sends money to the winner and resets the players array', async () => {
    try {
      await lottery.enter({
        from: accounts[0],
        value: web3.utils.toWei('2', 'ether'),
      })

      const initialBalance = await web3.eth.getBalance(accounts[0])
      await lottery.pickWinner({ from: accounts[0] })
      const finalBalance = await web3.eth.getBalance(accounts[0])
      const difference = finalBalance - initialBalance

      assert(difference > web3.utils.toWei('1.8', 'ether'))
    } catch (err) {
      assert(err)
    }
  })
})
