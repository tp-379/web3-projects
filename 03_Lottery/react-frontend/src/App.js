import React from 'react'
import web3 from './web3'
import lottery from './lottery'
import beams from './beams.jpg'
import './App.css'

class App extends React.Component {
  state = {
    manager: '',
    players: [],
    balance: '',
    value: '',
    message: '',
  }
  async componentDidMount() {
    const manager = await lottery.methods.manager().call()
    const players = await lottery.methods.getPlayers().call()
    const balance = await web3.eth.getBalance(lottery.options.address)

    this.setState({ manager, players, balance })
  }

  onSubmit = async (event) => {
    event.preventDefault()

    const accounts = await web3.eth.getAccounts()

    this.setState({ message: 'Waiting on transaction success...' })

    await lottery.methods.enter().send({
      from: accounts[0],
      value: web3.utils.toWei(this.state.value, 'ether'),
    })

    this.setState({ message: 'You have been entered!' })
  }

  onClick = async () => {
    const accounts = await web3.eth.getAccounts()

    this.setState({ message: 'Waiting on transaction success...' })

    await lottery.methods.pickWinner().send({
      from: accounts[0],
    })

    this.setState({ message: 'A winner has been picked!' })
  }
  render() {
    return (
      <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
        <img
          src={beams}
          alt=""
          className="absolute top-1/2 left-1/2 max-w-none -translate-x-1/2 -translate-y-1/2"
          width="1308"
        />
        <div className="relative bg-white px-6 pt-10 pb-8 shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:px-10">
          <div className="mx-auto max-w-md text-center">
            <h2 className="text-2xl font-bold leading-7">Lottery Contract</h2>
            <div className="">
              <div className="space-y-6 py-8 text-base leading-7 text-gray-600">
                <p>
                  This contract is managed by {this.state.manager}. There are
                  currently {this.state.players.length} people entered,
                  competing to win{' '}
                  {web3.utils.fromWei(this.state.balance, 'ether')} ether!
                </p>
              </div>
              <h4 className="text-xl font-bold leading-7">
                Want to try your luck?
              </h4>

              <form onSubmit={this.onSubmit}>
                <div class="grid grid-cols-2 gap-x-6 p-8">
                  <input
                    type="number"
                    value={this.state.value}
                    onChange={(event) =>
                      this.setState({ value: event.target.value })
                    }
                    className="px-4 focus:ring-indigo-500 focus:border-indigo-500 flex-1 block w-full rounded sm:text-sm border-gray-300"
                    placeholder="Amount of ether to enter..."
                  />
                  <button className="text-base font-medium rounded-lg p-3 bg-indigo-500 text-white">
                    Enter
                  </button>
                </div>
              </form>

              <div className="pt-8 text-base font-semibold leading-7">
                <p className="pb-6 text-gray-900">Ready to pick a winner?</p>
                <p>
                  <button
                    type="button"
                    onClick={this.onClick}
                    class="bg-indigo-600 text-white text-sm leading-6 font-medium py-2 px-3 rounded-lg"
                  >
                    Pick a winner!
                  </button>
                </p>
                <h2>{this.state.message}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

export default App
