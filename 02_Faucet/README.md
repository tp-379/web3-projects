<h1 align="center"> 
01 - Faucet Project
</h1>
<h3 align="center">
Built using <b>Truffle Framework</b> and <b>Vuejs3</b>
</h3>
This project is built using the Truffle framework and has a simple smart contract named Faucet.sol, which is:
<ul>
<li>payable, i.e. it accepts incoming payments and stores the amount,  </li>
<li>withdraw() function, to withdraw upto 0.5 ether who-so-ever wants to withdraw</li>
</ul>
Also this project has a frontend build in <b>Vuejs3</b>. The frontend of this project maintains a store(not the vuex store, but custom store based on vuejs3 reactivity) to keep track of data from the blockchain, like the account address, contract ABI, contract address, contract balance, errors, loading status, etc.

![Alt text](/02_Faucet/02_Faucet.png?raw=true "Frontend of the Faucet DApp")
