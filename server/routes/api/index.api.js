const router =require('express').Router();

router.use('/account',require('./account.route'));

module.exports=router;