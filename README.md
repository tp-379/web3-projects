<h1 align="center"> 
web3-projects
</h1>
<h5 align="center">
A collection of all web3 projects in my portfolio
</h5>
<br />
<h2 align="center"> 
01 - Hello World Project
</h2>
<h3 align="center">
Built using <b>Truffle Framework</b> and <b>Vuejs3</b>
</h3>
This project is built using the Truffle framework and has a simple smart contract named HelloWorld.sol, which has:
<ul>
<li>one state variable, </li>
<li>one constructor(to initialize that state variable), </li>
<li>two methods - store(to store the value in state variable) and retrieve(to retrieve the value of state variable). </li>
</ul>
Also this project has a frontend build in <b>Vuejs3</b>. The frontend of this project maintains a store(not the vuex store, but custom store based on vuejs3 reactivity) to keep track of data from the blockchain, like the account address, contract ABI, value of state variable, errors, loading status, etc.

![Alt text](/web3-projects/01_HelloWorld/01_HelloWorld.png?raw=true 'Frontend of the DApp')
