import React, { useState, useEffect } from 'react';
import './ProductPage.css'
import { useStateValue } from "./StateProvider";
import {rest_endpoint} from "./constants";

function ProductPage({ id }) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [state, setState] = useState();

  const url = rest_endpoint + 'product/' + id
  if(state.id == ""){
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      setState(data);
    })
    .catch(console.log)
  }


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
