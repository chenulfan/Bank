import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'


class Transaction extends Component {

    render() {
        const transcation = this.props.transcation
        return (
            <tr className="client-row">
                <td className={transcation.amount > 0 ? "green row-item" : "red row-item"}> {transcation.amount} </td>
                <td className="row-item"> {transcation.vendor} </td>
                <td className="row-item">  {transcation.category} </td>
            </tr>

        )
    }
}

export default Transaction;
