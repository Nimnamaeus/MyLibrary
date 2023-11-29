import HttpError from '@wasp/core/HttpError.js'

export const getBooks = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  return context.entities.Book.findMany({
    where: {
      userId: context.user.id
    }
  });
}

export const getBook = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const book = await context.entities.Book.findUnique({
    where: { id: args.id },
    include: { user: true }
  });

  if (!book) throw new HttpError(404, 'No book with id ' + args.id);

  if (book.userId !== context.user.id) throw new HttpError(400, 'Book does not belong to the user');

  return book;
}