import React, { Component } from 'react';
import axios from 'axios'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

class Sign extends Component {
    constructor() {
        super()
        this.state = {
            username: "",
            password: ""
        }
    }
    logUser = () => {
        this.props.logUser(this.state.username)
    }
    handleClick = async (e) => {
        let obj = {}
        const username = this.state.username
        const password = this.state.password
        obj = {
            username: username,
            password: password
        }
        this.props.addUser(obj)
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
                    <input type="text" name="username" class="question inp" id="nme" required autocomplete="off" value={this.state.username} onChange={this.handleInput} />
                    <label className="label" for="nme"><span>What's your username?</span></label>
                    <br></br>  <br></br> <br></br>
                    <input type="password" name="password" className="question inp" id="nme" required autocomplete="off" value={this.state.password} onChange={this.handleInput} />
                    <label className="label" for="nme"><span>What's your password?</span></label>
                    <button className="login" onClick={this.handleClick} >Sign Up</button>

                </div>

            </div>
        )
    }
}

export default Sign;
