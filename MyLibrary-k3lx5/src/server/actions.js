import HttpError from '@wasp/core/HttpError.js'

export const createBook = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const newBook = await context.entities.Book.create({
    data: {
      title: args.title,
      ISBN: args.ISBN,
      returnDate: args.returnDate,
      user: { connect: { id: context.user.id } }
    }
  });

  return newBook;
}

export const deleteBook = async (args, context) => {
  if (!context.user) { throw new HttpError(401) }

  const book = await context.entities.Book.findUnique({
    where: { id: args.id }
  });
  if (book.userId !== context.user.id) { throw new HttpError(403) }

  return context.entities.Book.delete({
    where: { id: args.id }
  });
}

export const borrowBook = async (args, context) => {
  if (!context.user) { throw new HttpError(401) };

  const book = await context.entities.Book.findUnique({
    where: { id: args.id }
  });
  if (!book) { throw new HttpError(404) };

  return context.entities.Book.update({
    where: { id: args.id },
    data: { returnDate: args.returnDate }
  });
}