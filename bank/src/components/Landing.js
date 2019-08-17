
import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Landing extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: "",
            showAlertUsername: false,
            showAlertPassword: false,
            approved: false
        }
    }
    SignIn = async () => {
        await this.setState({ currentUser: this.state.username })
        await localStorage.setItem("currentUser", this.state.username)
        this.props.getFromLocalStorage()
    }
    logUser = () => {
        this.props.logUser(this.state.username)
    }
    handleClick = async (e) => {
        const users = await axios.get('http://localhost:9999/login')
        const user = users.data.find(u => u.username === this.state.username)
        if (user !== undefined) {
            console.log(user)
            const username = user.username
            const password = user.password
            if (this.state.username === username && this.state.password === password) {
                this.setState({ showAlertUsername: false, showAlertPassword: false, approved: true })
                // this.logUser()
                localStorage.setItem("currentUser", username)
                this.SignIn()
                this.props.getFromLocalStorage()
            }
            else {
                if (this.state.username !== username) {
                    this.setState({ showAlertUsername: true })
                }
                else {
                    this.setState({ showAlertUsername: false })
                }
                if (this.state.password !== password) {
                    this.setState({ showAlertPassword: true })
                }

            }
        }
        else {
            this.setState({ showAlertUsername: true })
        }
        this.props.calculateSum()
    }
    getFromDataBase = async () => {
        let user = await axios.get('http://localhost:9999/login')
    }
    handleInput = (e) => {
        const name = e.target.name
        const value = e.target.value
        // console.log(name)
        // console.log(value)

        this.setState({
            [name]: value
        })
    }
    render() {

        return (
            <div>
                <div className="bg-image"> </div>

                <div className="welcome"> Welcome to THE BANK</div>

                <div className="form">
                    <h2> Login In: </h2>
                    <input type="text" name="username" class="question inp" id="nme" required autocomplete="off" value={this.state.username} onChange={this.handleInput} />
                    <label className="label" for="nme"><span>What's your username?</span></label>
                    <br></br>  <br></br> <br></br>
                    <input type="password" name="password" className="question inp" id="nme" required autocomplete="off" value={this.state.password} onChange={this.handleInput} />
                    <label className="label" for="nme"><span>What's your password?</span></label>
                    <button className="login" onClick={this.handleClick}  >Log In</button>
                    {/* <Link className="ref" to="/sign">Sign In</Link> */}
                    {this.state.showAlertUsername ? <div> wrong user userName </div> : null}
                    {this.state.showAlertPassword ? <div> wrong user password </div> : null}
                </div>

            </div>
        )
    }
}

export default Landing;
