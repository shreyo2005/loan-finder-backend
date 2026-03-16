const schemes=require('../data/schemes.json')
const getallschemes=async(req,res)=>{
    try{
        res.status(200).json({
            count:schemes.length,
            schemes:schemes
        })
    }   
    catch(error){
            res.status(500).json({message:error.message})
        }

    }

    const getschemebyid=async(req,res)=>{
        try{
            const scheme=schemes.find(s=>s.id===Number(req.params.id))
            if(!scheme){
                return res.status(404).json({message:'scheme not found'})
            }
            res.status(200).json(scheme)
        }catch(error){
            res.status(500).json({message:error.message})
        }
    }
const searchSchemes=async(req,res)=>{
    try{
        const {purpose,amount}=req.body
        if(!purpose||!amount){
            return res.status(400).json({
                message:'please provide purpose and amount'
            })
        }
        //const schemes=require('../data/schemes.json')
        const matchingschemes=schemes.filter(scheme=>
            scheme.purpose===purpose &&
            amount>=scheme.minAmount &&
            amount<=scheme.maxAmount
        )
        if(matchingschemes.length===0){
            return res.status(404).json({
                message:'no schemes found for criteria'
            })
        }
        res.status(200).json({
            count:matchingschemes.length,
            schemes:matchingschemes
        })

    }catch(error){
        res.status(500).json({message:error.message})
    }

}
module.exports={getallschemes,getschemebyid, searchSchemes }