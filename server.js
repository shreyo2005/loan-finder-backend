const express =require('express');
const dotenv=require('dotenv')
const connectDB=require('./config/db')
const loanroutes=require('./routes/loanroutes')

dotenv.config()
connectDB()

const app=express()
app.use(express.json())  //middleware to read json data in the request body and make it available to us 
app.use('/api/loans',loanroutes)

app.post('/test', (req, res) => {
    res.json({ message: 'server works' })
})


const PORT = process.env.PORT || 3000
app.listen(PORT, ()=>{
  console.log(`server is running on port ${PORT}`)
})