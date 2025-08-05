import React, { useEffect, useState } from 'react';
import axios from 'axios';
import cartManageStore from '../stores/cartManageStore';
import useUserStore from '../stores/userStore';
import { editCart } from '../api/cartApi';

function CartItem({ bookId, onRemove, cart }) {
    const { userId } = useUserStore();
    const [book, setBook] = useState(null);
    const getAllCart = cartManageStore(state => state.getAllCart);
    const token = useUserStore(state => state.token)
    // console.log("bookId", bookId);

    console.log(cart);
    // console.log(userId);
   
    
    const [cartItems, setCartItems] = useState([]);
    const [countCart, setCountCart] = useState(0);

    useEffect(() => {
        axios.get(`http://localhost:6500/api/book/${bookId}`)
            .then(res => setBook(res.data))
            .catch(err => console.error('Error fetching book:', err));
        const run = async() => {
            const allCart = await getAllCart(token);
            const totalItems = allCart.data.cart.items;
            setCartItems(totalItems)
        }
        run()
    }, [bookId]);

    const handleQtyChange = async (data, type) => {
        const itemId = cartItems.find(item => item.productId === data.productId).id
        const updatedQuantity = type === "inc" ? data.quantity + 1 : data.quantity - 1;
        const response = await editCart({ userId, itemId, quantity: updatedQuantity + countCart }, token);
        setCountCart(prev => prev + (type === "inc" ? 1 : -1))
        console.log(response.data.item);
        // setQuantity(q => Math.max(1, type === 'inc' ? q + 1 : q - 1));
    };

    if (!book) return null;

    return (
        <div className="flex items-center justify-between py-3 border-b">
            <div className="flex items-center gap-3 w-[40%]">
                <input type="checkbox" className="form-checkbox" />
                {book.edition?.[0]?.coverImage ? (
                    <img
                        src={"book.edition[0]?.coverImage"}
                        alt={book.title}
                        className="w-12 h-16 object-cover"
                    />
                ) : (
                    <div className="w-12 h-16 bg-gray-200 flex items-center justify-center text-xs text-gray-500">
                        No Image
                    </div>
                )}
                <div>
                    <p className="font-semibold">{book.title}</p>
                    <p className="text-sm text-gray-500">{book.author}</p>
                </div>
            </div>

            <div className="flex items-center gap-2 w-[20%] justify-center">
                <button onClick={() => handleQtyChange(cart, "dec")} className="px-2 py-1 border rounded">−</button>
                <span>{cart.quantity+countCart}</span>
                <button onClick={() => handleQtyChange(cart, "inc")} className="px-2 py-1 border rounded">+</button>
            </div>

            <div className="w-[20%] text-center text-amber-700 font-semibold">
                ${(cart.product.price * (cart.quantity+countCart)).toFixed(2)}
            </div>

            <div className="w-[20%] flex justify-center">
                <button onClick={() => onRemove(bookId)} className="text-gray-500 hover:text-red-600 text-xl">🗑️</button>
            </div>
        </div>
    );
}

export default CartItem