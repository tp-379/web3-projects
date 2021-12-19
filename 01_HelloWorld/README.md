<h1 align="center"> 
01 - Hello World Project
</h1>
<h5 align="center">
Built using Truffle and Vuejs3
</h5>
This project is built using the Truffle framework and has a simple smart contract named HelloWorld.sol, which has one state variable, one constructor(to initialize that state variable), two methods store(to store the value in state variable) and retrieve(to retrieve the value of state variable). Also this project has a frontend build in Vuejs3. The frontend of this project maintains a store(not the vuex store, but custom store based on vuejs3 reactivity) to keep track of data from the blockchain, like the account address, contract ABI, value of state variable, errors, loading status, etc.