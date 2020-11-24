import React, { useState, useEffect, useContext } from 'react';
import './Orders.css'
import { useStateValue } from "./StateProvider";
import Order from './Order';
import { UserProvider, UserContext, UserDispatchContext } from "./UserState";
import {rest_endpoint} from "./constants";

function Orders() {
  const [{ basket, user }, dispatch] = useStateValue();
  const userDetails = useContext(UserContext);
  const [orders, setOrders] = useState([]);


  useEffect(() => {
    if(userDetails) {
      const url = rest_endpoint + 'orders/' + userDetails.email;
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setOrders(data);
        // setState({ id: data['asin'], title: data['title'], image: data['imUrl'], price: data['price'] })
      })
      .catch(console.log)

    } else {
        setOrders([])
    }

  }, [userDetails])

    return (
        <div className='orders'>
            <h1>Your Orders</h1>

            <div className='orders__order'>
                {orders?.map(order => (
                    <Order order={order} />
                ))}
            </div>
        </div>
    )
}

export default Orders
