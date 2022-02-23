import sdk from './1-initialize-sdk.js'
import { readFileSync } from 'fs'

const bundleDrop = sdk.getBundleDropModule(
  '0x4229106955e6B51c9ff53697d1Ece9f2bC8F0180'
)

;(async () => {
  try {
    await bundleDrop.createBatch([
      {
        name: 'Pizza JPEG',
        description: 'This NFT will give you access to PizzaDAO!',
        image: readFileSync('scripts/assets/pizza.jpg'),
      },
    ])
    console.log('✅ Successfully created a new NFT in the drop!')
  } catch (error) {
    console.error('failed to create the new NFT', error)
  }
})()
