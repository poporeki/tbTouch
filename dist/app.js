var express=require('express');
var app=express();
var path=require('path')

var ejs=require('ejs');
app.use('/static', express.static('static'));
app.set('view engine','ejs');
app.get('/',function(req,res){
    res.render('index');
});

app.listen(4002,function(){
    console.log('server is running');
})