import React, { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getBook from '@wasp/queries/getBook';
import deleteBook from '@wasp/actions/deleteBook';
import borrowBook from '@wasp/actions/borrowBook';

export function Book() {
  const { bookId } = useParams();
  const { data: book, isLoading, error } = useQuery(getBook, { id: parseInt(bookId) });
  const deleteBookFn = useAction(deleteBook);
  const borrowBookFn = useAction(borrowBook);
  const [returnDate, setReturnDate] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleDeleteBook = () => {
    deleteBookFn({ id: parseInt(bookId) });
  };

  const handleBorrowBook = () => {
    borrowBookFn({ id: parseInt(bookId), returnDate });
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
      <p>ISBN: {book.ISBN}</p>
      <p>Return Date: {book.returnDate}</p>
      <button
        onClick={handleDeleteBook}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded mt-4"
      >
        Delete Book
      </button>
      <div className="mt-4">
        <input
          type="text"
          placeholder="Return Date"
          className="px-1 py-2 border rounded"
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <button
          onClick={handleBorrowBook}
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded ml-2"
        >
          Borrow Book
        </button>
      </div>
      <Link to="/books" className="mt-4 bg-gray-500 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded">
        Back to Books
      </Link>
    </div>
  );
}