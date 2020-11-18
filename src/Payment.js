import React, { useState, useEffect, useContext } from 'react';
import './Payment.css';
import { useStateValue } from "./StateProvider";
import CheckoutProduct from "./CheckoutProduct";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useStripe, useElements } from "@stripe/react-stripe-js";
import CurrencyFormat from "react-currency-format";
import { getBasketTotal } from "./reducer";
import axios from 'axios';
import { db } from "./firebase";
import { UserProvider, UserContext, UserDispatchContext } from "./UserState";


function Payment() {
    const [{ basket, user }, dispatch] = useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing, setProcessing] = useState("");
    const [error, setError] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);
    const userDetails = useContext(UserContext);

    useEffect(() => {
        // generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post',
                // Stripe expects the total in a currencies subunits
                url: `/payments/create?total=${getBasketTotal(basket) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }

        getClientSecret();
    }, [basket])

    console.log('THE SECRET IS >>>', clientSecret)
    console.log('👱', user)


    const handleSubmit = e => {
      e.preventDefault();
      console.log("Clicked on Buy Now");
      console.log(basket);
      const product_ids = []
      basket.forEach((item) => {
        product_ids.push(item.id)
      });


      axios.post('https://om9htfa30g.execute-api.us-east-1.amazonaws.com/dev/orders ',{
        "id": userDetails.email,
        "products": product_ids
      })
      .then(res => {
        console.log(res);
        })
        dispatch({
                    type: 'EMPTY_BASKET'
                })
        history.replace('/');
    }

    // const handleSubmit = async (event) => {
    //     // do all the fancy stripe stuff...
    //     event.preventDefault();
    //     setProcessing(true);
    //
    //     const payload = await stripe.confirmCardPayment(clientSecret, {
    //         payment_method: {
    //             card: elements.getElement(CardElement)
    //         }
    //     }).then(({ paymentIntent }) => {
    //         // paymentIntent = payment confirmation
    //
    //         db
    //           .collection('users')
    //           .doc(user?.uid)
    //           .collection('orders')
    //           .doc(paymentIntent.id)
    //           .set({
    //               basket: basket,
    //               amount: paymentIntent.amount,
    //               created: paymentIntent.created
    //           })
    //
    //         setSucceeded(true);
    //         setError(null)
    //         setProcessing(false)
    //
    //         dispatch({
    //             type: 'EMPTY_BASKET'
    //         })
    //
    //         history.replace('/orders')
    //     })
    //
    // }


    return (
        <div className='payment'>
            <div className='payment__container'>
                <h1>
                    Checkout (
                        <Link to="/checkout">{basket?.length} items</Link>
                        )
                </h1>


                {/* Payment section - delivery address */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Delivery Address</h3>
                    </div>
                    <div className='payment__address'>
                        <p>{user?.email}</p>
                        <p>123 React Lane</p>
                        <p>Los Angeles, CA</p>
                    </div>
                </div>

                {/* Payment section - Review Items */}
                <div className='payment__section'>
                    <div className='payment__title'>
                        <h3>Review items and delivery</h3>
                    </div>
                    <div className='payment__items'>
                        {basket.map(item => (
                            <CheckoutProduct
                                id={item.id}
                                title={item.title}
                                image={item.image}
                                price={item.price}
                                rating={item.rating}
                            />
                        ))}
                    </div>
                </div>


                {/* Payment section - Payment method */}
                <div className='payment__section'>
                    <div className="payment__title">
                        <h3>Payment Method</h3>
                    </div>
                    <div className="payment__details">
                            {/* Stripe magic will go */}

                            <form>
                                <div className='payment__priceContainer'>
                                    <CurrencyFormat
                                        renderText={(value) => (
                                            <h3>Order Total: {value}</h3>
                                        )}
                                        decimalScale={2}
                                        value={getBasketTotal(basket)}
                                        displayType={"text"}
                                        thousandSeparator={true}
                                        prefix={"$"}
                                    />
                                    <button type='submit' onClick={handleSubmit}>
                                        <span>Buy Now</span>
                                    </button>
                                </div>

                                  {/* Errors */}
                                {error && <div>{error}</div>}
                            </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Payment
