const mongoose= require('mongoose')
const searchhistoryschema=new mongoose.Schema({
    user:{
        type:mongoose.Types.ObjectId,
        ref:'User',
        required:true
    },
    purpose: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    resultsCount: {
        type: Number,
        default: 0
    },
    schemesfound:[{
        type:mongoose.Schema.Types.ObjectId,
        ref:'Loanscheme'
    }],
},{timestamps:true})
mongoose.exports=mongoose.model('Searchhistory',searchhistoryschema)