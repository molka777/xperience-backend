const express = require('express')
const httpProxy = require('express-http-proxy')
const app = express()

const userServiceProxy = httpProxy('http://localhost:5001/user')


// Proxy request
app.get('/users', (req, res) => {
  userServiceProxy(req, res)
})
const PORT = process.env.PORT || 5005;

app.listen(PORT, err =>
  err ? console.log(err) : console.log(`server is running on PORT ${PORT}`)
);