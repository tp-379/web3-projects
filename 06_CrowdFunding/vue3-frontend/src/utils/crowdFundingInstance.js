import web3 from './web3'
import CrowdFunding from './../build/contracts/CrowdFunding.json'

// console.log(ProjectFactory.abi)
const crowdFundingInstance = new web3.eth.Contract(
  CrowdFunding.abi,
  '0xf9632f2dFCFffa4dA864D986203Cd2A609Ab0f87'
)

export default crowdFundingInstance
