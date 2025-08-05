import React, { useEffect, useState } from 'react';
import CartItem from '../../components/CartItem';
import cartManageStore from '@/src/stores/cartManageStore';
import useUserStore from '@/src/stores/userStore';

function Cart() {
  const [cartItems, setCartItems] = useState([]); // array of bookIds
  const { carts, getAllCart } = cartManageStore(); 
  const token = useUserStore(state => state.token)

  // console.log("token",token);
  // console.log('cartItem', cartItems)
  useEffect(() => {
    const run = async () => {
      const result = await getAllCart(token);

      setCartItems(result?.data.cart.items)
      // console.log("result", result);
    }

    run()
  }, [])


    console.log(cartItems);

  const handleRemove = (id) => {
    setCartItems(items => items.filter(bookId => bookId !== id));
  };

  return (
    <div className="bg-[#f5eddc] min-h-screen p-8">
      <h2 className="text-2xl font-bold flex items-center gap-2 mb-6">
        🛒 Your Cart
      </h2>

      <div className="bg-white p-4 rounded-lg shadow">
        {/* Table Header */}
        <div className="flex justify-between text-sm text-gray-500 pb-2 border-b font-medium">
          <div className="w-[40%]">Item</div>
          <div className="w-[20%] text-center">Amount</div>
          <div className="w-[20%] text-center">Total</div>
          <div className="w-[20%] text-center">Action</div>
        </div>

        {/* Cart Items */}
        {cartItems.length > 0 ? (
          cartItems.map(cart => (
            <CartItem key={cart.id} bookId={cart.product.bookId} onRemove={handleRemove} cart={cart}/>
          ))
        ) : (
          <p className="text-center text-gray-500 py-6">Your cart is empty.</p>
        )}

        {/* Footer */}
        <div className="flex justify-between items-center mt-6 pt-4 border-t">
          <span className="text-gray-700 font-medium">Total ( {cartItems.length} items )</span>
          <span className="text-orange-600 font-bold text-xl">
            ${cartItems.length * 23.01 /* placeholder */.toFixed(2)}
          </span>
          <button className="ml-auto px-6 py-2 bg-orange-600 text-white rounded hover:bg-orange-700">
            Check out →
          </button>
        </div>
      </div>
    </div>
  );
}

export default Cart;