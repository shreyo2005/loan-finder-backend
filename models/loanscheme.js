const mongoose=require('mongoose')
const loanschemeschema=new mongoose.Schema({
    name:{type:String,required:true},
    provider:{type:String,required:true},
    purpose: {
    type: String,
    required: true,
    enum: ['education', 'home', 'business', 'vehicle', 'personal']
},
    minAmount: { type: Number, required: true },
    maxAmount: { type: Number, required: true },
    interestRate: { type: String, required: true },
    tenure: { type: String, required: true },
    description: { type: String, required: true }
}, 
{ timestamps: true })

module.exports=mongoose.model('LoanScheme',loanschemeschema)

