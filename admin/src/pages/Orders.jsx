import React, { useEffect } from 'react'
import axios from 'axios'
import { backendUrl, currency } from '../App'
import { assets } from '../assets/assets'

const Orders = ({token}) => {

  const [orders , setOrders] = React.useState([])

  const fetchAllOrders = async () => {
     if(!token){
        return null;
     }
    try {
      const response = await axios.post(backendUrl + '/api/order/all',{},{headers:{token}});
      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("orders error", error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }
  , []);

  return (
    <div>
      <h3>Order Page</h3>
      <div>
        {
          orders.map(
            (order , index) => (
              <div key={index}>
                  <img src={assets.parcel_icon} alt="" />
                  <div>
                    {
                      order.items.map(
                        (item , index) => {
                          if(index === order.items.length - 1){
                            return (
                              <p key={index}>
                               {item.name}x{item.quantity}
                                <span>{item.size}</span>
                              </p>
                            )
                          } else {
                            return (
                              <p key={index}>
                               {item.name}x{item.quantity}
                                <span>{item.size}</span>,
                              </p>
                            )
                          }
                        }
                      )
                    }
                  </div>
                  <p>{order.address.firstName+" "+order.address.lastName}</p>
                  <div>
                    <p>{order.address.street+","}</p>
                    <p>{order.address.city+","}</p>
                    <p>{order.address.state+","}</p>
                    <p>{order.address.country+","}</p>
                    <p>{order.address.zipcode+","}</p>
                  </div>
                  <p>{order.address.phone}</p>
                  <div>
                    <p>Items:{order.items.length}</p>
                    <p>Method:{order.paymentMethod}</p>
                  </div>
              </div>
            )
          )
        }
      </div>
    </div>
  )
}

export default Orders