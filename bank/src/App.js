import React, { Component } from 'react';
import './App.css';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import axios from 'axios'
import Transactions from '../src/components/Transactions'
import Landing from '../src/components/Landing'
import Sign from '../src/components/Sign'
import Operations from '../src/components/Operations'
import Links from '../src/components/Links'

class App extends Component {
  constructor() {
    super()
    this.state = {
      arrTransactions: [],
      currentUser: localStorage.getItem("currentUser") || "",
      username: '',
      sum: this.calculateSum
    }
  }
  async componentDidMount() {
    await this.getFromLocalStorage()
    this.calculateSum()

  }
  getFromLocalStorage = () => {
    let users = JSON.parse(localStorage.getItem("users"))
    let user = []
    console.log(users)
    console.log(localStorage.getItem("currentUser") !== null)
    if (localStorage.getItem("currentUser") !== null) {
      user = users.find(u => u.username === this.state.currentUser)
      console.log(user)
      this.setState({ currentUser: localStorage.getItem("currentUser") })
      if (user !== undefined) {
        this.setState({ arrTransactions: user.transactions })
        console.log(user.transactions)
      }
    }
    // this.balance()
  }
  addTransToCurrentUser = (transaction) => {
    this.setState({ sum: this.state.sum + transaction.amount })
    let users = JSON.parse(localStorage.getItem("users"))
    let user = users.find(u => u.username === this.state.currentUser)
    console.log(user)
    user.transactions.push(transaction)
    localStorage.setItem("users", JSON.stringify(users))
    this.setState({ arrTransactions: user.transactions })
    console.log(JSON.parse(localStorage.getItem("users")))
  }
  print = () => {
    console.log(this.state.currentUser)
    console.log(this.state.arrTransactions)
  }
  LogOut = () => {
    this.setState({ currentUser: "", arrTransactions: [] })
  }

  handleInput = (e) => {
    const name = e.target.name
    const value = e.target.value
    this.setState({
      [name]: value
    })
  }

  addUser = async (user) => {
    const users = await axios.get('http://localhost:9999/login')
    if (users.data.find(u => u.username === user.username)) {
      console.log("taken username")
    }
    else {
      await axios.post('http://localhost:9999/signup', user)
      console.log("added username: " + user.username)
      this.addNewUserToLocalStorage(user.username)
    }
  }
  addNewUserToLocalStorage = (username) => {
    let objUser = { username: username, transactions: [] }
    let users = JSON.parse(localStorage.getItem("users")) || []
    users.push(objUser)
    localStorage.setItem("users", JSON.stringify(users))
  }
  calculateSum = () => {
    if (localStorage.getItem("currentUser") !== "") {
      const users = JSON.parse(localStorage.getItem("users"))
      console.log(users)
      let sum = 0
      let trans = users.filter(u => u.username === this.state.currentUser)[0].transactions.forEach(k => sum += k.amount)
      console.log(sum)
      this.setState({ sum })
    }
  }
  render() {
    return (
      <Router>
        <Links getFromLocalStorage={this.getFromLocalStorage} LogOut={this.LogOut} />
        <Route exact path="/sign" render={() => <Sign addUser={this.addUser} />} />
        <Route exact path="/" render={() => <Landing calculateSum={this.calculateSum} logUser={this.logUser} getFromLocalStorage={this.getFromLocalStorage} />} />
        <div className="wrapper-trans">
          <Route exact path="/transactions" render={() => <Transactions sum={this.state.sum} transcations={this.state.arrTransactions} getFromLocalStorage={this.getFromLocalStorage} addTransToCurrentUser={this.addTransToCurrentUser} />} />
          <Route exact path="/transactions" render={() => <Operations sum={this.state.sum} handleClick={this.handleClick} username={this.state.username} addTransToCurrentUser={this.addTransToCurrentUser} />} />
        </div>
      </Router>
    )
  }
}

export default App;
