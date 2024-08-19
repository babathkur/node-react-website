import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

const UpdateProduct = () => {
    const [name, setName] = useState();
    const [price, setPrice] = useState();
    const [category, setCategory] = useState();
    const [company, setCompany] = useState();
    const params = useParams();
    // const [error, setError] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        console.log(params.id);
        getProductDetail();
    }, [])

    const getProductDetail = async () => {
        console.log(params.id);
        let result = await fetch(`http://localhost:5000/product/${params.id}`);
        result = await result.json();
        console.log(result);
        setName(result.name);
        setPrice(result.price);
        setCategory(result.category);
        setCompany(result.company)

    }

    const updateProduct = async () => {
        console.log(name, price, category, company);
        let result = await fetch(`http://localhost:5000/product/${params.id}`, {
            method: "put",
            body: JSON.stringify({ name, price, category, company }),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        result = await result.json();
        console.log(result);
        navigate("/");

    }
    return (
        <div className="product">
            <h1>Update Product</h1>
            <input className="inputBox" type="text" placeholder="Enter Product Name" onChange={(e) => setName(e.target.value)} value={name} />
            <input className="inputBox" type="text" placeholder="Enter Product Price" onChange={(e) => setPrice(e.target.value)} value={price} />
            <input className="inputBox" type="text" placeholder="Enter Product Category" onChange={(e) => setCategory(e.target.value)} value={category} />
            <input className="inputBox" type="text" placeholder="Enter Product Company" onChange={(e) => setCompany(e.target.value)} value={company} />
            <button onClick={updateProduct} className="appButton" type="button">Update Product</button>
        </div>
    )
}
export default UpdateProduct;