const account=require('../../models/account/account.model');
const express=require('express');
var bodyParser = require('body-parser')

// create application/json parser
var jsonParser = bodyParser.json()
var urlencodedParser = bodyParser.urlencoded({ extended: false })

const router=express.Router();
router.post('/',async (req,res,next)=>{
    const accounts= await account.getAllAccount();
    if(!accounts)
        return res.status(404).json({
            errors:{
                data: 'data not found'
            }
        });
    return res.json({
        account_list:accounts
    });
});
router.get('/',async (req,res,next)=>{
    let accounts;
    await account.getAllAccount().then(res=>{
        accounts=res.hits.hits;
    }).catch(err=>{
        throw  err;
    })
    if(!accounts)
        return res.status(404).json({
            errors:{
                data: 'data not found'
            }
        });
    return res.json({
        account_list:accounts
    });
});
router.post('/add',jsonParser,async (req,res)=>{
    const check=await account.getSingleAccountByUsername(req.body.username);
    console.log(check,req.body.username);
    if(check){
        console.log("invalid");
        return res.status(403).send("Invalid account");
    }
    const accounts=await account.getAllAccount();
    await accounts.sort((a,b)=>{
        return a._id-b._id;
    });
    console.log(accounts);
    var id=1;
    for(let i=0;i<accounts.length;i++){
        if(accounts[i]._id>id)
            break;
        id++;
    }
    console.log(id);
    req.body.id=id;
    console.log(req.body);
    const result =await account.addAccount(req.body);
    if(result){
        const accs=await account.getAllAccount();
        res.status(200).json({
            account_list:accs
        })
    }else{
        res.status(403).json({
            err:"create account failed!!!"
        })
    }
});
router.post('/update',jsonParser,async(req,res)=>{
    console.log("body: ",req.body);
    const result =await account.updateAccount(req.body);
    console.log(result);
    if(result){
        const accs=await account.getAllAccount();
        res.status(200).json({
            account_list:accs
        })
    }else{
        res.status(403).json({
            err:"update failed!!!"
        })
    }
});
router.post('/delete',async(req,res,next)=>{
    const id=req.query.id;
    if(!id) {
        return res.status(404).json({
            parameter: {
                query: 'require account ID'
            }
        });
    }
    const result=await account.deleteAccount(id);
    if(result===1){
        let accounts=await account.getAllAccount();
        return res.json({
            account_list:accounts
        })
    }else{
        return res.status(403).json({
            err:"cannot find account"
        });
    }
})
module.exports=router;