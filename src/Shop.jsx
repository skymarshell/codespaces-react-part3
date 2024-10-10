import React, { useState } from 'react';
import './Shop.css'
import { useEffect } from 'react';
import axios from 'axios';

export default function Shop() {
    const url = 'https://symmetrical-space-invention-4j796jw54wq9h95g-5000.app.github.dev'
    const [products, setProducts] = useState([])
    useEffect(() => {
        axios.get(`${url}/api/products`)
            .then((response) => { setProducts(response.data) })
            .catch(error => console.log(error))

        return () => {

        }
    }, [])
    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)



    const productList = products.map((item) => <Item key={item.id} {...item} callback={addCart} />)
    const cartList = cart.map((item, index) =>
        <li>
            {item.id} {item.name} {item.price}
            < button onClick={() => setCart(cart.filter((i, _index) => index != _index))}>
                Delete
            </button >
        </li>
    );



    function addCart(item) {
        setCart([...cart, { id: item.id, name: item.name, price: item.price }])
    }

    useEffect(() => {
        const cal = () => {
            let total = 0;
            cart.forEach((item) => {
                total += item.price;
            });
            setTotalPrice(total);
        };
        cal();
    }, [cart]);


    return (
        <>
            <h1>Price : {totalPrice}</h1>
            <button onClick={() => setCart([])}>Clear cart</button>
            <div className="grid-container">
                {productList}
            </div >
            <h1>Cart</h1>
            {cartList}
        </>

    )
}

const Item = (prop) => {
    return (
        <div key={prop.id} onClick={() => prop.callback(prop)} >
            <img src={prop.img} width={200} height={200} /> <br />
            id : {prop.id} <br />
            name : {prop.name} <br />
            price : {prop.price} <br />
        </div>

    )
}