const express=require('express')
const router=express.Router()
//insted of app.post, i make a router for each feature
//router is a feature of express
//this router only hsndles loan related features

const {searchSchemes}=require('../controllers/loancontroller')
//../ means one folder up from routes/folder to reach the root then go to controllers/folder


console.log('searchSchemes:', searchSchemes)
//for debug 

router.post('/search',searchSchemes)

router.post('/search', (req, res) => {
    res.json({ message: 'route works' })
})//for debugging 


module.exports=router

// POST /api/loans/search
//         
// server.js sees /api/loans and sends to loanRoutes.js
//         
// loanRoutes.js sees /search and calls searchSchemes function
//         
// searchSchemes in loanController.js runs and sends response back