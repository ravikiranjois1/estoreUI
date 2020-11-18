import React, { useState, useEffect, useContext } from 'react';
import './SearchResults.css'
import { useStateValue } from "./StateProvider";
import Order from './Order';
import { UserProvider, UserContext, UserDispatchContext } from "./UserState";
import OrderProductComponent from "./OrderProductComponent";
import { useLocation, useHistory } from "react-router-dom";



function SearchResults({key}) {
  const [{ basket, user }, dispatch] = useStateValue();
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const history = useHistory();


  useEffect(() => {
    console.log("Hello from search");
    console.log(location.state.searchText);
      const url = 'https://om9htfa30g.execute-api.us-east-1.amazonaws.com/dev/search/' + location.state.searchText;
      fetch(url)
      .then(res => res.json())
      .then((data) => {
        console.log(data)
        setProducts(data);
        // setState({ id: data['asin'], title: data['title'], image: data['imUrl'], price: data['price'] })
      })
      .catch(console.log)
  }, [key])

    return (
        <div className='orders'>
            <h1>Your Search Results</h1>

            <div className='orders__order'>
            {products.map(item => (
                <OrderProductComponent
                    id={item}
                    displayButton
                />
            ))}
            </div>
        </div>
    )
}

export default SearchResults
