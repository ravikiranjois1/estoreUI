import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";
import {rest_endpoint} from "./constants";


function Product({ id }) {
  const [{ basket }, dispatch] = useStateValue();
  const [state, setState] = useState({ id: "", title: "", image: "", price: 0 });
  const url = rest_endpoint + 'product/lite/' + id
  if(state.id == ""){
    fetch(url)
    .then(res => res.json())
    .then((data) => {
      setState({ id: data['asin'], title: data['title'], image: data['imUrl'], price: data['price'] })
    })
    .catch(console.log)
  }

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

  return (
    <div className="product">
      <div className="product__info">
        <p>{state.title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{state.price}</strong>
        </p>
      </div>

      <img src={state.image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
