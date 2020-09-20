function authController(){
    //in this we use the factory function.Factory function is a simple function which return the object.
    //CRUD controller 
    return{
        login(req,res){
         res.render('auth/login')
        },

        register(req,res){
            res.render('auth/register')
        }
    }
}


module.exports = authController