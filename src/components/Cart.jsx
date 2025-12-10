export default function Cart({ cart,setCart }) {
    const removeItem = (id) => {
    setCart(cart.filter(item => item._id !== id));
  };
  return (
    <div>
      <h2>Your Cart</h2>
      {cart.length === 0 && <p>No items in cart.</p>}
      {cart.map(item => (
        <div key={item._id} style={{ marginBottom: 20 }}>
          <h3>{item.name}</h3>
          <p>₹{item.price}</p>
    <button onClick={() => removeItem(item._id)}>Remove</button>
        </div>
      ))}
    </div>
  );
}
