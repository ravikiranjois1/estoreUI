import React from 'react'
import './Order.css'
import moment from "moment";
import OrderProductComponent from "./OrderProductComponent";
import CurrencyFormat from "react-currency-format";

function Order({ order }) {
    console.log(order);
    return (
        <div className='order'>
            <h2>Order</h2>
            <p>{moment.unix(order["unixorderTime"]).format("MMMM Do YYYY, h:mma")}</p>
            <p className="order__id">
                <small>{order.order_id}</small>
            </p>
            {Object.keys(order.products_ordered).map(item => (
                <OrderProductComponent
                    id={item}
                />
            ))}

        </div>
    )
}

export default Order
