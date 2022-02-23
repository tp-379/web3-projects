import { useEffect, useMemo, useState } from 'react'
// import thirdweb
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'

// We instantiate the sdk on Rinkeby.
const sdk = new ThirdwebSDK('rinkeby')

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(
  '0x4229106955e6B51c9ff53697d1Ece9f2bC8F0180'
)

const App = () => {
  // Use the connectWallet hook thirdweb gives us.
  const { connectWallet, address, error, provider } = useWeb3()
  console.log('👋 Address:', address)

  // The signer is required to sign transactions on the blockchain.
  // Without it we can only read data, not write.
  const signer = provider ? provider.getSigner() : undefined

  // State variable for us to know if user has our NFT.
  const [hasClaimedNFT, setHasClaimedNFT] = useState(false)

  // isClaiming lets us easily keep a loading state while the NFT is minting.
  const [isClaiming, setIsClaiming] = useState(false)

  // Another useEffect!
  useEffect(() => {
    // We pass the signer to the sdk, which enables us to interact with
    // our deployed contract!
    sdk.setProviderOrSigner(signer)
  }, [signer])

  useEffect(async () => {
    // If they don't have an connected wallet, exit!
    if (!address) {
      return
    }

    // Check if the user has the NFT by using bundleDropModule.balanceOf
    const balance = await bundleDropModule.balanceOf(address, '0')

    try {
      // If balance is greater than 0, they have our NFT!
      if (balance.gt(0)) {
        setHasClaimedNFT(true)
        console.log('🌟 this user has a membership NFT!')
      } else {
        setHasClaimedNFT(false)
        console.log("😭 this user doesn't have a membership NFT.")
      }
    } catch (error) {
      setHasClaimedNFT(false)
      console.error('failed to nft balance', error)
    }
  }, [address])

  // This is the case where the user hasn't connected their wallet
  // to your web app. Let them call connectWallet.
  if (!address) {
    return (
      <div className="landing">
        <h1>Welcome to PizzaDAO</h1>
        <button onClick={() => connectWallet('injected')} className="btn-hero">
          Connect your wallet
        </button>
      </div>
    )
  }

  // Add this little piece!
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
      </div>
    )
  }

  const mintNft = async () => {
    setIsClaiming(true)
    try {
      // Call bundleDropModule.claim("0", 1) to mint nft to user's wallet.
      await bundleDropModule.claim('0', 1)
      // Set claim state.
      setHasClaimedNFT(true)
      // Show user their fancy new NFT!
      console.log(
        `🌊 Successfully Minted! Check it out on OpenSea: https://testnets.opensea.io/assets/${bundleDropModule.address}/0`
      )
    } catch (error) {
      console.error('failed to claim', error)
    } finally {
      // Stop loading state.
      setIsClaiming(false)
    }
  }

  // Render mint nft screen.
  return (
    <div className="mint-nft">
      <h1>Mint your free 🍪DAO Membership NFT</h1>
      <button disabled={isClaiming} onClick={() => mintNft()}>
        {isClaiming ? 'Minting...' : 'Mint your nft (FREE)'}
      </button>
    </div>
  )
}

export default App
