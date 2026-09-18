import { useDispatch, useSelector } from "react-redux";
import ItemList from "./ItemList";
import { clearCart, removeItem } from "../utils/cartSlice";

const Cart = () => {
  const cartItems = useSelector((store) => store.cart.items);
  console.log(cartItems);
  const dispatch = useDispatch();

  const handleClearCart = () => {
    dispatch(clearCart());
  };

  const handleRemoveItems = () => {
    dispatch(removeItem());
  };

  return (
    <div className="text-center m-4 p-4">
      <h1 className="text-xl font-bold">Cart</h1>
      <div className="w-6/12 m-auto">
        <button
          className="p-2 m-2 bg-black text-white rounded-lg py-1 shadow-md hover:bg-slate-600 font-bold active:scale-95"
          onClick={handleClearCart}
        >
          Clear Cart
        </button>
        <button
          className="p-2 m-2 bg-black text-white rounded-lg py-1 shadow-md hover:bg-slate-600 font-bold active:scale-95"
          onClick={handleRemoveItems}
        >
          Remove Item
        </button>
        {cartItems.length === 0 && (
          <h1>Cart is empty! Add items to the cart!</h1>
        )}

        <ItemList items={cartItems} isCart={true} />
      </div>
    </div>
  );
};

export default Cart;
