const Menu = require('../../models/menu')
function homeController(){
    //in this we use the factory function.Factory function is a simple function which return the object.
    //CRUD controller 
    return{
      async index(req,res){

            //first way
            
            const pizzas = await Menu.find()
           // console.log(pizzas);
            return res.render('home',{pizzas:pizzas})

          //Second way

          //  Menu.find().then(function(pizzas){
            //    console.log(pizzas)
           //     return res.render('home',{pizzas:pizzas})
           // })
        }
    }
}


module.exports = homeController