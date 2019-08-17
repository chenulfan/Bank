import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import Transaction from "./Transaction"

class Transactions extends Component {

    addTransTocurrentUser = () => {
        const obj = { amount: 40000, vendor: "ccccccd", category: "some" }
        this.props.addTransTocurrentUser(obj)
    }
    render() {
        const transcations = this.props.transcations
        return (
            <div>
                <h1> Welcome Back,  {localStorage.getItem("currentUser")} </h1>
                <h1> Balance: {this.props.sum} </h1>
                <table id="table">
                    <tr id="table-header">
                        <th className="header-item"> Amount </th>
                        <th className="header-item"> Vendor </th>
                        <th className="header-item"> Category </th>
                    </tr>
                    {transcations.map(t => <Transaction transcation={t} />)}
                </table>
            </div>

        )
    }
}

export default Transactions;
