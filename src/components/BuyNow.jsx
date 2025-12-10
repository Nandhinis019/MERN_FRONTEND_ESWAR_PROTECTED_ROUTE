import { useParams } from "react-router-dom";
import { products } from "../utils/api";
export default function BuyNow() {
  const { id } = useParams();
  const product = products.find(p => p._id === id);
  if (!product) return <p>Product not found</p>;
  return (
    <div>
      <h2>Buy Now</h2>
      <h3>{product.name}</h3>
      <p>₹{product.price}</p>
      <p>✅ Order has been placed</p>
    </div>
  );
}
