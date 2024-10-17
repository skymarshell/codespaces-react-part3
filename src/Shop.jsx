import React, { useState, useRef } from 'react';
import './Shop.css'
import { useEffect } from 'react';
import axios from 'axios';

export default function Shop() {
    const id_ref = useRef(null)
    const name_ref = useRef(null)
    const price_ref = useRef(null)
    const img_ref = useRef(null)
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



    const productList = products.map((item) => <Item key={item.id} {...item} callback={addCart} delete_product={delete_product} upd_callback={updateProductForm}/>)
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

    function addProduct() {
        const data = {
            name: name_ref.current.value,
            price: price_ref.current.value,
            img: img_ref.current.value
        }
        console.log(data.name, data.price, data.img);

        axios.post(url + `/api/addproduct`, data)
            .then((response) => setProducts(response.data))
            .catch((error) => console.log(error))
    }


    function delete_product(e, id) {
        e.stopPropagation()
        console.log(id);
        axios.delete(url + `/api/products/${id}`)
            .then((response) => setProducts(response.data))
    }

    function updateProductForm(item) {
        id = item.id;
        name_ref.current.value = item.name;
        price_ref.current.value = item.price;
        img_ref.current.value = item.img;
    }
    function updateProduct() {
        const data = {
            name: name_ref.current.value,
            price: price_ref.current.value,
            img: img_ref.current.value
        };
        if (!id) alert("no id");
        else
            axios.put(URL + '/api/updateproduct/' + id, data)
                .then(response => {
                    if (response.data.status == "ok") alert("Update product sucessfully!");
                    setProducts(response.data.products);
                })
                .catch(error => {
                    console.log("error");
                });
    }

    return (
        <>
            name: <input type="text" ref={name_ref} />
            price: <input type="number" ref={price_ref} />
            img: <input type="text" ref={img_ref} />
            <button onClick={addProduct}>Add</button>
            <button onClick={updateProduct}>update</button>
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
            <button onClick={(e) => prop.delete_product(e, prop.id)}>Delete</button>
            <button onClick={(e) => prop.upd_callback(e, prop)}>update</button>
        </div>

    )
}