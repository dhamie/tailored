require('dotenv').config()

const routes = require('./engine/routes/routes')
const express = require('express')
const mongoose= require('mongoose')
const bodyParser = require('body-parser');  
const mongoString = process.env.DATABASE_URL


mongoose.connect(mongoString);
const db = mongoose.connection

const app = express()
const port = 3000

db.on('error', (error) => {
  console.log(error)
}) 

db.once('connected', () =>{
  console.log('db connected')
})

app.get('/', (req, res) => {
  res.send('use engine/routes in url');
});

app.get("/:universalURL", (req, res) => {
  res.send("404 URL NOT FOUND");
}); 
 
app.use('/routes', routes)

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)  
})