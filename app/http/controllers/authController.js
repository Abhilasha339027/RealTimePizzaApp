const User = require('../../models/user')

function authController(){
    //in this we use the factory function.Factory function is a simple function which return the object.
    //CRUD controller 
    return{
        login(req,res){
         res.render('auth/login')
        },

        register(req,res){
            res.render('auth/register')
        },
        postRegister(req,res) {
            const { name, email, password } = req.body

           //Validate error

           if(!name || !email || !password){
               req.flash('error','All fields are required')
               req.flash('name',name)
               req.flash('email',email)
               return res.redirect('/register')
           }
            console.log(req.body)
        }
    }
}


module.exports = authController