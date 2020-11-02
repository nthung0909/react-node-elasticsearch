const express=require('express');
const PORT = process.env.PORT || 8000;
const session = require('express-session');
const path=require('path');
//var cors = require('cors')
var app=express();

app.use(session({
    secret:'nthung',
    resave:false,
    saveUninitialized:true,
    cookie:{maxAge:1000*60*60}
}))
app.use(express.urlencoded({
    extended: true
}));
app.use(function(req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
});

app.use(express.static(path.join(__dirname,"build")));
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

//add routes
app.use('/',require('./routes/index.route'));
// //add error
app.use((req,res,next)=>{
    const err=new Error("not found");
    err.status=404;
    next(err);
})
app.use((req,res,err)=>{
    res.status(err.status|500);
    res.json({
        error:{
            message:err.message,
            error:{}
        },
    });
});
app.listen(PORT,(req,res)=>{
    console.log(`app is running at port ${PORT}`);
});