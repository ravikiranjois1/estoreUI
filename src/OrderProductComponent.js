import React, { useState } from 'react';
import './OrderProductComponent.css'
import { useStateValue } from "./StateProvider";

function OrderProductComponent({ id, displayButton }) {
    const [{ basket }, dispatch] = useStateValue();
    const [state, setState] = useState({ id: "", title: "", image: "", price: 0 });
    const url = 'https://om9htfa30g.execute-api.us-east-1.amazonaws.com/dev/product/lite/' + id
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      setState({ id: data['asin'], title: data['title'], image: data['imUrl'], price: data['price'] })
    })
    .catch(console.log)

    const addToBasket = () => {
      // dispatch the item into the data layer
      console.log("Add to basket")
      dispatch({
        type: "ADD_TO_BASKET",
        item: {
          id: state.id,
          title: state.title,
          image: state.image,
          price: state.price,
        },
      });
    };
    //



    return (
        <div className='OrderProduct'>
            <img className='OrderProduct__image' src={state.image} />

            <div className='OrderProduct__info'>
                <p className='OrderProduct__title'>{state.title}</p>
                <p className="OrderProduct__price">
                    <small>$</small>
                    <strong>{state.price}</strong>
                </p>
            </div>
            {displayButton && (
                <div className="AddToBasket"><button onClick={addToBasket}>Add to Basket</button> </div>
            )}
        </div>
    )
}

export default OrderProductComponent
