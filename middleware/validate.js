//loanroutes.js -> validate.js -> loancontroller.js

const validate=(req,res,next)=>{
    const{purpose,amount}=req.body
    if(!purpose){
        return res.status(400).json({message:'purpose is required'})
    }
    if(!amount){
        return res.status(400).json({message:'amount is required'})
    }
    if(typeof amount!=='number'){
        return res.status(400).json({message:'amount must be number'})
    }
    if(amount<=0){
        return res.status(400).json({message:'amount must be greater than zero'})
    }
    const validpurpose=['education','home','business','vehicle','personal']
    if(!validpurpose.includes(purpose)){
        return res.status(400).json({
            message:`purpose must be one of: ${validpurpose.join(', ')}`
        })
    }
    next()

}

module.exports=validate