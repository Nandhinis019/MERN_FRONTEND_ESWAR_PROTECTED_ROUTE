import React from 'react'
import { products } from '../utils/api';
import { Link, useParams } from 'react-router-dom';

export default function Product() {
    const { id } = useParams();
  const product = products.find(p => p._id === id);

  if (!product) return <p>Product not found</p>;
  return (
    <div>
        <img src={product.image} width="250" />
        <p>{product.name}</p>
        <p>{product.description}</p>
       <p> {product.price}</p>
       <Link to={`/buynow/${product._id}`}>
        <button>Buy Now</button>
      </Link>
      </div>
  )
}
