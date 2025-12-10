import { Link } from "react-router-dom"
import { products } from "../utils/api"

export default function Products({setCart,cart}) {
 const addToCart = (item) => {
    setCart([...cart, item]);
  };
  return (
    <div>
        <h2>All Products</h2>
        {products.map(p => (
          <div key={p._id} >
            <img src={p.image} alt={p.name} width="150" />
            <h3>{p.name}</h3>
            <p>₹{p.price}</p>
             <Link to={`/product/${p._id}`}>View</Link> 
           <button onClick={() => addToCart(p)}>Add to Cart</button>
          </div>
        ))}
    </div>
  )
}
