// function firstname(firstname) {
//   return function(lastname){
//     return `my firstname is ${firstname} and 
//     last name is ${lastname}`
//   }
// }

// const name = firstname("chike");
// console.log(name("obi"))


const express = require("express")
const port = process.env.PORT

const app = express()
const name =
   
  app.use(bodyPar);
  app.use(bodyParser.urlencoded({extended: true}))


app.get("/", (req, res) => {
  res.redirect("/api/customer")
})

app.get("/api/customer", (req, res) => {
  res.status(200).send(customer)
}) 

app.post("/api/customer", (req, res) => {
  
}) 

app.put("/api/customer/:id", (req, res) => {
  
}) 

app.delete("/api/customer/:id", (req, res) => {
  
}) 

app.get("/api/customer/:id", (req, res) => {
  
}) 

app.get("/*/", (req, res) => {
  res.render("home.ejs")
}) 
const{name: age, passowrd, school} = req.body


app.listen(port , ()=>console.log(`server is running on port ${port}`))

