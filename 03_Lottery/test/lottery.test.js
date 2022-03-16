const Lottery = artifacts.require('Lottery')

contract('Lottery', function (/* accounts */) {
  it('should assert true', async function () {
    await Lottery.deployed()
    return assert.isTrue(true)
  })
})
