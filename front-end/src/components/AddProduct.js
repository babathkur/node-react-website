import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [company, setCompany] = useState();
    const [error, setError] = useState(false);
    const navigate = useNavigate();



    const addProduct = async () => {

        if (!name || !price || !category || !company) {
            setError(true);
            return false;
        }
        console.log("name,price,category,company", name, price, category, company);
        const userId = JSON.parse(localStorage.getItem('user'))._id;
        console.log(userId);
        let result = await fetch("http://localhost:5000/add-product", {
            method: "post",
            body: JSON.stringify({ name, price, category, company, userId }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        if (result) {
            navigate('/');
        }
    }
    return (
        <div className="product">
            <h1>Add Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} value={name} />
            {error && !name && <span className="invalid-input">Enter valid name</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} value={price} />
            {error && !price && <span className="invalid-input">Enter valid price</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Category" onChange={(e) => setCategory(e.target.value)} value={category} />
            {error && !category && <span className="invalid-input">Enter valid category name</span>}
            <input className="inputBox" type="text" placeholder="Enter Product Company" onChange={(e) => setCompany(e.target.value)} value={company} />
            {error && !company && <span className="invalid-input">Enter valid company name</span>}
            <button onClick={addProduct} className="appButton" type="button">Add Product</button>
        </div>
    )
}
export default AddProduct;