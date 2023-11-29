import { useAction } from '@wasp/actions';
import borrowBook from '@wasp/actions/borrowBook';
import createBook from '@wasp/actions/createBook';
import deleteBook from '@wasp/actions/deleteBook';
import { useQuery } from '@wasp/queries';
import getBooks from '@wasp/queries/getBooks';
import { useState } from 'react';

export function DashboardPage() {
  const { data: books, isLoading, error } = useQuery(getBooks);
  const createBookFn = useAction(createBook);
  const deleteBookFn = useAction(deleteBook);
  const borrowBookFn = useAction(borrowBook);
  const [newBookTitle, setNewBookTitle] = useState('');
  const [newBookISBN, setNewBookISBN] = useState('');
  const [newBookReturnDate, setNewBookReturnDate] = useState('');

  if (isLoading) return 'Loading...';
  if (error) return 'Error: ' + error;

  const handleCreateBook = () => {
    createBookFn({
      title: newBookTitle,
      ISBN: newBookISBN,
      returnDate: newBookReturnDate
    });
    setNewBookTitle('');
    setNewBookISBN('');
    setNewBookReturnDate('');
  };

  const handleDeleteBook = (bookId) => {
    deleteBookFn({ id: bookId });
  };

  const handleBorrowBook = (bookId) => {
    const returnDate = prompt('Enter return date:');
    if (returnDate) {
      borrowBookFn({ id: bookId, returnDate });
    }
  };

  return (
    <div className="p-4">
      <div className="flex gap-x-4 py-5">
        <input
          type="text"
          placeholder="New Book Title"
          className="px-1 py-2 border rounded text-lg"
          value={newBookTitle}
          onChange={(e) => setNewBookTitle(e.target.value)}
        />
        <input
          type="text"
          placeholder="New Book ISBN"
          className="px-1 py-2 border rounded text-lg"
          value={newBookISBN}
          onChange={(e) => setNewBookISBN(e.target.value)}
        />
        <button
          onClick={handleCreateBook}
          className="bg-blue-500 hover:bg-blue-700 px-2 py-2 text-white font-bold rounded"
        >
          Add Book
        </button>
      </div>
      <div>
        {books.map((book) => (
          <div
            key={book.id}
            className="py-2 px-2 flex items-center hover:bg-slate-100 gap-x-2 rounded"
          >
            <p>{book.title}</p>
            <p>{book.ISBN}</p>
            <p>{book.returnDate}</p>
            <button
              onClick={() => handleDeleteBook(book.id)}
              className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
            >
              Delete Book
            </button>
            <button
              onClick={() => handleBorrowBook(book.id)}
              className="bg-green-500 hover:bg-green-700 text-white font-bold py-2 px-4 rounded"
            >
              Borrow Book
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}