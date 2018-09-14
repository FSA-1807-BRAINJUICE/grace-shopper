import axios from 'axios'


class CartService {
  constructor(){
  }

  async addItem(item){
    // check if a user is logged-in
    // if a user is logged-out, then check if there is a cookie for an order.

    const cartId = 'cartId';


    var d = new Date();
    d.setTime(d.getTime() + (365*24*60*60*1000));
    var expires = "expires="+ d.toUTCString();
    document.cookie =  "order=" + cartId + ";" + expires + ";path=/";


    // create a new order if needed
    const res = await axios.post('/api/order');
    const order = res.data;
    //cartId = data.id;

    // add the item to the cart;
    const itemRes = await axios.post(`/api/order/${cartId}/item`);
    const items = itemRes.data;

    return items;
  }

  deleteItem(itemId){

  }

  updateItem(item){

  }

}
