import React, { useState } from 'react';
import { useQuery } from '@wasp/queries';
import { useAction } from '@wasp/actions';
import getBooks from '@wasp/queries/getBooks';
import createBook from '@wasp/actions/createBook';
import borrowBook from '@wasp/actions/borrowBook';

export function Books() {
  const { data: books, isLoading, error } = useQuery(getBooks);
  const createBookFn = useAction(createBook);
  const borrowBookFn = useAction(borrowBook);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookISBN, setNewBookISBN] = useState('');
  const [returnDate, setReturnDate] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateBook = () => {
    createBookFn({ title: newBookTitle, ISBN: newBookISBN, returnDate: returnDate });
    setNewBookTitle('');
    setNewBookISBN('');
    setReturnDate('');
  };

  const handleBorrowBook = (bookId) => {
    borrowBookFn({ id: bookId, returnDate: returnDate });
  };

  return (
    <div className=''>
      <div className='flex gap-x-4 py-5'>
        <input
          type='text'
          placeholder='Book Title'
          className='px-1 py-2 border rounded text-lg'
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <input
          type='text'
          placeholder='Book ISBN'
          className='px-1 py-2 border rounded text-lg'
          value={newBookISBN}
          onChange={(e) => setNewBookISBN(e.target.value)}
        />
        <input
          type='text'
          placeholder='Return Date'
          className='px-1 py-2 border rounded text-lg'
          value={returnDate}
          onChange={(e) => setReturnDate(e.target.value)}
        />
        <button
          onClick={handleCreateBook}
          className='bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded'
        >
          Add Book
        </button>
      </div>
      <div>
        {books.map((book) => (
          <div
            key={book.id}
            className='py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded'
          >
            <p>{book.title}</p>
            <p>{book.ISBN}</p>
            <p>{book.returnDate}</p>
            <button
              onClick={() => handleBorrowBook(book.id)}
              className='bg-green-500 hover:bg-green-700 px-2 py-2 text-white font-bold rounded'
            >
              Borrow Book
            </button>
            <button
              onClick={() => deleteBookFn({ id: book.id })}
              className='bg-red-500 hover:bg-red-700 px-2 py-2 text-white font-bold rounded'
            >
              Delete Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}