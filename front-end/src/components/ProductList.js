import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";

const ProductList = () => {
    const [products, setProducts] = useState([]);
    useEffect(() => {
        getProducts();
    }, []);

    const getProducts = async () => {
        let result = await fetch("http://localhost:5000/products");
        result = await result.json();
        setProducts(result);

    }
    console.log("Products", products);


    const deleteProduct = async (id) => {
        console.log(id);
        let result = await fetch(`http://localhost:5000/delete/${id}`, {
            method: "Delete"
        });
        result = await result.json();
        if (result) {
            getProducts();
        }
    }

    const searchHandle = async (event) => {
        console.log(event.target.value);
        let key = event.target.value;
        if (key) {
            let result = await fetch(`http://localhost:5000/search/${key}`);
            result = await result.json();
            if (result) {
                setProducts(result);
            }
        }
        else {
            getProducts()
        }

    }
    return (
        <div className="product-list">
            <h1>Product List</h1>
            <input type="text" placeholder="Search Products" className="search-product-box" onChange={searchHandle} />
            <ul>
                <li>S.No</li>
                <li>Name</li>
                <li>Price</li>
                <li>Category</li>
                <li>Company</li>
                {/* <li>Operation</li> */}

            </ul>
            {
                products.length > 0 ? products.map((item, index) =>
                    <ul key={item._id} >
                        <li>{index + 1}</li>
                        <li>{item.name}</li>
                        <li>{item.price}</li>
                        <li>{item.category}</li>
                        {/* <li>{item.company}</li> */}
                        <li><button onClick={() => deleteProduct(item._id)}>Delete</button>
                            <Link to={"/update/" + item._id}>Update</Link>
                        </li>

                    </ul>


                ) :
                    <h3>No result found</h3>
            }
        </div >
    )
}

export default ProductList;