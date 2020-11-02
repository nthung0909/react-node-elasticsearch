const router=require('express').Router();

router.use('/api',require('./api/index.api'));

module.exports=router;