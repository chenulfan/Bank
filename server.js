const express =require("express")
const bodyParser =require("body-parser")
const app =express()
const mongoose = require("mongoose")


app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))
app.use(function (req, res, next) {
    res.header('Access-Control-Allow-Origin', '*')
    res.header('Access-Control-Allow-Methods', 'GET,PUT,POST,DELETE,OPTIONS')
    res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization, Content-Length, X-Requested-With')

    next()
})

// app.get("/transactions", function(req, res){
//     Transactions.find({}).exec(function(err, transactions){
//         console.log(transactions)
//         res.send(transactions)
//     })
// })

// app.post("/transaction", function(req, res){
//     localStorage.get
// })

app.get("/login", function(req, res){
    Users.find({}).exec(function(err, users){
        console.log(users)
        res.send(users)
    })
})
app.post("/signup", function(req, res){
    let users = new Users(req.body)
    users.save()
    res.end()
})

mongoose.connect("mongodb://localhost/Bank", { useNewUrlParser: true })

const Sehcma = mongoose.Schema
// const transactionSchema = new Sehcma({
//     amount: Number,
//     vendor: String,
//     category: String
// })
// const Transactions = mongoose.model("transactions", transactionSchema)

const userSchema = new Sehcma({
    username: String,
    password: String
})
const Users = mongoose.model("users", userSchema)


app.listen(9999, function(){
    console.log("listeing 9999")
})
