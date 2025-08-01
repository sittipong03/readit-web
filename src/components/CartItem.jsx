import React, { useEffect, useState } from 'react';
import axios from 'axios';

function CartItem({ bookId, onRemove }) {
    const [book, setBook] = useState(null);
    const [quantity, setQuantity] = useState(1);

    useEffect(() => {
        axios.get(`http://localhost:6500/api/book/${bookId}`)
            .then(res => setBook(res.data))
            .catch(err => console.error('Error fetching book:', err));
    }, [bookId]);

    const handleQtyChange = (type) => {
        setQuantity(q => Math.max(1, type === 'inc' ? q + 1 : q - 1));
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
                <button onClick={() => handleQtyChange('dec')} className="px-2 py-1 border rounded">−</button>
                <span>{quantity}</span>
                <button onClick={() => handleQtyChange('inc')} className="px-2 py-1 border rounded">+</button>
            </div>

            <div className="w-[20%] text-center text-amber-700 font-semibold">
                ${(book.price * quantity).toFixed(2)}
            </div>

            <div className="w-[20%] flex justify-center">
                <button onClick={() => onRemove(bookId)} className="text-gray-500 hover:text-red-600 text-xl">🗑️</button>
            </div>
        </div>
    );
}

export default CartItem