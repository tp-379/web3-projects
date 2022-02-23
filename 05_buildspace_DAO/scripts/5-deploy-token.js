import sdk from './1-initialize-sdk.js'

// In order to deploy the new contract we need our old friend the app module again.
const app = sdk.getAppModule('0x5EDeF07a4390cA43EFb9Bd6bcE8Fc03bc6516619')

;(async () => {
  try {
    // Deploy a standard ERC-20 contract.
    const tokenModule = await app.deployTokenModule({
      // What's your token's name? Ex. "Ethereum"
      name: 'PizzaDAO Governance Token',
      // What's your token's symbol? Ex. "ETH"
      symbol: 'PZA',
    })
    console.log(
      '✅ Successfully deployed token module, address:',
      tokenModule.address
    )
  } catch (error) {
    console.error('failed to deploy token module', error)
  }
})()
