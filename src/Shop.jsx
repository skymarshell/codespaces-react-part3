import React, { useState } from 'react';
import './Shop.css'
import { useEffect } from 'react';

export default function Shop() {

    const [cart, setCart] = useState([])
    const [totalPrice, setTotalPrice] = useState(0)

    const products = [
        {
            id: 0, name: "Notebook Acer Swift", price: 45900, img: "https://img.advice.co.th/images_nas/pic_product4/A0147295/A0147295_s.jpg"
        },
        {
            id: 1, name: "Notebook Asus Vivo", price: 19900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146010/A0146010_s.jpg"
        },
        {
            id: 2, name: "Notebook Lenovo Ideapad", price: 32900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149009/A0149009_s.jpg"
        },
        {
            id: 3, name: "Notebook MSI Prestige", price: 54900, img: "https://img.advice.co.th/images_nas/pic_product4/A0149954/A0149954_s.jpg"
        },
        {
            id: 4, name: "Notebook DELL XPS", price: 99900, img: "https://img.advice.co.th/images_nas/pic_product4/A0146335/A0146335_s.jpg"
        },
        {
            id: 5, name: "Notebook HP Envy", price: 46900, img: "https://img.advice.co.th/images_nas/pic_product4/A0145712/A0145712_s.jpg"
        }]

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