
import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transaction from "./Transaction"

class Links extends Component {

    logOut = async () =>{
        localStorage.setItem("currentUser", "")
        await this.props.LogOut()
        this.props.getFromLocalStorage()
    }
    render() {
        const currentUser = localStorage.getItem('currentUser')
        return (
            <div className="nav-wrapper">
                <Link className="ref" to="/"> Home </Link>
                { currentUser!== ""? <Link className="ref" to="/transactions"> Transactions </Link> : null }
                <Link className="ref" to="/sign"> Sign In </Link>
                <span className="ref loged-user"> {localStorage.getItem("currentUser")} </span>
                <Link className="logOut ref" to="/" onClick={this.logOut}> Log Out </Link>
            </div>
        )
    }
}

export default Links;
