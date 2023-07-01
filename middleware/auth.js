let auth = (req ,res ,next) =>{
    if(req.user){
        next()
    }
    else{
        res.render('singin')
    }
}
module.exports = auth