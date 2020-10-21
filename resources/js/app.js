import axios from 'axios'

import Noty from 'noty'


let addToCart = document.querySelectorAll('.add-to-cart')
let cartCounter = document.querySelector('#cartCounter')

function updateCart(pizza){
   axios.post('/update-cart',pizza).then(res=>{
       console.log(res)
       cartCounter.innerText = res.data.totalQty
      new Noty({
          type: 'success',
          timeout : 2000,
          text: 'Item added to cart'
    }).show();
   }).catch(err => {
    new Noty({
        type: 'error',
        timeout : 2000,
        text: 'Something went wrong'
  }).show();    

   })
}

addToCart.forEach((btn)=>{
    btn.addEventListener('click',(e)=>{
        let pizza = JSON.parse(btn.dataset.pizza)
        updateCart(pizza)
    })
})

//Remove alert message after X seconds
const alertMsg = document.querySelector('#success-alert')
if(alertMsg) {
    setTimeout(()=>{
        alertMsg.remove()
    } ,2000)
}
