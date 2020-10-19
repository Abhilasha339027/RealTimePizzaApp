const User = require('../../models/user')
const bcrypt = require('bcrypt')
const passport = require('passport')
function authController(){
    //in this we use the factory function.Factory function is a simple function which return the object.
    //CRUD controller 
    return{
        login(req,res){
         res.render('auth/login')
        },

        postLogin(req,res,next){

            const {email, password } = req.body

            //Validate error
 
            if(!email || !password){
                req.flash('error','All fields are required')
                return res.redirect('/login')
            }

            passport.authenticate('local',(err,user,info) => {
              if(err) {
                  req.flash('error', info.messages)
                  return next(err)
              }

              if(!user){
                  req.flash('error', info.messages)
                  return res.redirect('/login')
              }

              req.logIn(user, (err)=>{
                  if(err){
                      req.flash('error',info.messages)
                      return next(err)
                  }

                  return res.redirect('/')
              })
            })(req, res , next)
        },

        register(req,res){
            res.render('auth/register')
        },
       async postRegister(req,res) {
            const { name, email, password } = req.body

           //Validate error

           if(!name || !email || !password){
               req.flash('error','All fields are required')
               req.flash('name',name)
               req.flash('email',email)
               return res.redirect('/register')
           }
          
           //Check if email exists
           User.exists({email:email },(err,result)=>{
               if(result){
                req.flash('error','Email already taken')
                req.flash('name',name)
                req.flash('email',email)
                return res.redirect('/register')
               }
           })
           
          //Hash password we use yarn add bcrypt package so download this package and import it
           const hashedPassword = await bcrypt.hash(password , 10)
           //Create a user

           const user = new User({
               name: name,
               email: email,
               password: hashedPassword
           })
            
           user.save().then((user) => {
               //Login
               return res.redirect('/')
           }).catch(err => {
            req.flash('error','Something went wrong')
            return res.redirect('/register')
           })

        },
        logout(req,res) {
            req.logout()
            return res.redirect('/login')
        }
    }
}


module.exports = authController