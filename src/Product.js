import React, { useState, useEffect } from "react";
import "./Product.css";
import { useStateValue } from "./StateProvider";

function Product({ id, title, image, price, rating }) {
  const [state, setState] = useState({ id: "", title: "", image: "", price: 0 });


  useEffect(() => {
    // Update the document title using the browser API
    const proxyurl = "https://cors-anywhere.herokuapp.com/";
    const url = 'https://om9htfa30g.execute-api.us-east-1.amazonaws.com/dev/product/lite/B005G17SD0'
    fetch(proxyurl + url)
    .then(res => res.json())
    .then((data) => {
      console.log(data)
      setState({ id: data['asin'], title: data['title'], image: data['imUrl'], price: data['price'] })
    })
    .catch(console.log)
  });

  // componentDidMount() {
  //       fetch('http://jsonplaceholder.typicode.com/users')
  //       .then(res => res.json())
  //       .then((data) => {
  //         this.setState({ contacts: data })
  //       })
  //       .catch(console.log)
  //     }

  const addToBasket = () => {
    // dispatch the item into the data layer
    console.log("Add to basket")
    // dispatch({
    //   type: "ADD_TO_BASKET",
    //   item: {
    //     id: id,
    //     title: title,
    //     image: image,
    //     price: price,
    //     rating: rating,
    //   },
    // });
  };

  return (
    <div className="product">
      <div className="product__info">
        <p>{state.title}</p>
        <p className="product__price">
          <small>$</small>
          <strong>{state.price}</strong>
        </p>
        <div className="product__rating">
          {Array(5)
            .fill()
            .map((_, i) => (
              <p>🌟</p>
            ))}
        </div>
      </div>

      <img src={state.image} alt="" />

      <button onClick={addToBasket}>Add to Basket</button>
    </div>
  );
}

export default Product;
