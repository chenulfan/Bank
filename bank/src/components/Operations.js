import React, { Component } from 'react';
import axios from 'axios'

class Operations extends Component {
    constructor() {
        super()
        this.state = {
            amount: "",
            vendor: "",
            category: "",
            showAlert: false
        }
    }
    handleClick = (e) => {
        let obj = {}
        let sum = this.props.sum
        let amount = this.state.amount
        if(this.state.amount !== "" && this.state.vendor !== "" && this.state.category !== "" )
        if (e.target.name === "add") {
            obj = {
                amount: parseInt(this.state.amount),
                vendor: this.state.vendor,
                category: this.state.category
            }
            this.props.addTransToCurrentUser(obj)
            this.setState({ showAlert: false })
        }
        else {
            if (sum - amount > 500) {
                obj = {
                    amount: parseInt(this.state.amount) * -1,
                    vendor: this.state.vendor,
                    category: this.state.category
                }
                this.props.addTransToCurrentUser(obj)
                this.setState({ showAlert: false })
            }
            else {
                alert("can't")
                this.setState({ showAlert: true })
            }
        }
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
            <div className='input-trans-wrapper'>
                <div className="inpBox">
                    <input id="inpAmount" type="text" className="question inp" name="amount" value={this.state.amount} onChange={this.handleInput} ></input>
                    <label className="label" for="nme"><span>Insert Amount</span></label>
                </div>

                <div className="inpBox">
                    <input id="inpVendor" type="text" className="question inp" name="vendor" value={this.state.vendor} onChange={this.handleInput} ></input>
                    <label className="label" for="nme"><span>Insert Vendor</span></label>
                </div>

                <div className="inpBox">
                    <input id="inpCategory" type="text" className="question inp" name="category" value={this.state.category} onChange={this.handleInput} ></input>
                    <label className="label" for="nme"><span>Insert Category</span></label>
                </div>

                <button className="add" name="add" onClick={this.handleClick}> Deposit</button>
                <button className="less" name="less" onClick={this.handleClick}> Withdraw</button>

                {this.state.showAlert ? <div id="alert"> Can Not</div> : null}
            </div>
        )
    }
}

export default Operations;


