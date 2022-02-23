import { useEffect, useMemo, useState } from 'react'
import { ethers } from 'ethers'

// import thirdweb
import { useWeb3 } from '@3rdweb/hooks'
import { ThirdwebSDK } from '@3rdweb/sdk'

// We instantiate the sdk on Rinkeby.
const sdk = new ThirdwebSDK('rinkeby')

// We can grab a reference to our ERC-1155 contract.
const bundleDropModule = sdk.getBundleDropModule(
  '0x4229106955e6B51c9ff53697d1Ece9f2bC8F0180'
)

const tokenModule = sdk.getTokenModule(
  '0xC8f6c17cb168b317db3FBa4D3C20A8431Ad06407'
)

const voteModule = sdk.getVoteModule(
  '0x206c1C72ebAbC16828B550E763aec56C00308Ff0'
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

  // Holds the amount of token each member has in state.
  const [memberTokenAmounts, setMemberTokenAmounts] = useState({})
  // The array holding all of our members addresses.
  const [memberAddresses, setMemberAddresses] = useState([])

  // A fancy function to shorten someones wallet address, no need to show the whole thing.
  const shortenAddress = (str) => {
    return str.substring(0, 6) + '...' + str.substring(str.length - 4)
  }

  const [proposals, setProposals] = useState([])
  const [isVoting, setIsVoting] = useState(false)
  const [hasVoted, setHasVoted] = useState(false)

  // Retrieve all our existing proposals from the contract.
  useEffect(async () => {
    if (!hasClaimedNFT) {
      return
    }
    // A simple call to voteModule.getAll() to grab the proposals.
    try {
      const proposals = await voteModule.getAll()
      setProposals(proposals)
      console.log('🌈 Proposals:', proposals)
    } catch (error) {
      console.log('failed to get proposals', error)
    }
  }, [hasClaimedNFT])

  // We also need to check if the user already voted.
  useEffect(async () => {
    if (!hasClaimedNFT) {
      return
    }

    // If we haven't finished retrieving the proposals from the useEffect above
    // then we can't check if the user voted yet!
    if (!proposals.length) {
      return
    }

    // Check if the user has already voted on the first proposal.
    try {
      const hasVoted = await voteModule.hasVoted(
        proposals[0].proposalId,
        address
      )
      setHasVoted(hasVoted)
      if (hasVoted) {
        console.log('🥵 User has already voted')
      } else {
        console.log('🙂 User has not voted yet')
      }
    } catch (error) {
      console.error('Failed to check if wallet has voted', error)
    }
  }, [hasClaimedNFT, proposals, address])

  // This useEffect grabs all the addresses of our members holding our NFT.
  useEffect(async () => {
    if (!hasClaimedNFT) {
      return
    }

    // Just like we did in the 7-airdrop-token.js file! Grab the users who hold our NFT
    // with tokenId 0.
    try {
      const memberAddresses = await bundleDropModule.getAllClaimerAddresses('0')
      setMemberAddresses(memberAddresses)
      console.log('🚀 Members addresses', memberAddresses)
    } catch (error) {
      console.error('failed to get member list', error)
    }
  }, [hasClaimedNFT])

  // This useEffect grabs the # of token each member holds.
  useEffect(async () => {
    if (!hasClaimedNFT) {
      return
    }

    // Grab all the balances.
    try {
      const amounts = await tokenModule.getAllHolderBalances()
      setMemberTokenAmounts(amounts)
      console.log('👜 Amounts', amounts)
    } catch (error) {
      console.error('failed to get token amounts', error)
    }
  }, [hasClaimedNFT])

  // Now, we combine the memberAddresses and memberTokenAmounts into a single array
  const memberList = useMemo(() => {
    return memberAddresses.map((address) => {
      return {
        address,
        tokenAmount: ethers.utils.formatUnits(
          // If the address isn't in memberTokenAmounts, it means they don't
          // hold any of our token.
          memberTokenAmounts[address] || 0,
          18
        ),
      }
    })
  }, [memberAddresses, memberTokenAmounts])

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

  // If the user has already claimed their NFT we want to display the interal DAO page to them
  // only DAO members will see this. Render all the members + token amounts.
  if (hasClaimedNFT) {
    return (
      <div className="member-page">
        <h1>🍪DAO Member Page</h1>
        <p>Congratulations on being a member</p>
        <div>
          <div>
            <h2>Member List</h2>
            <table className="card">
              <thead>
                <tr>
                  <th>Address</th>
                  <th>Token Amount</th>
                </tr>
              </thead>
              <tbody>
                {memberList.map((member) => {
                  return (
                    <tr key={member.address}>
                      <td>{shortenAddress(member.address)}</td>
                      <td>{member.tokenAmount}</td>
                    </tr>
                  )
                })}
              </tbody>
            </table>
          </div>
        </div>
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
