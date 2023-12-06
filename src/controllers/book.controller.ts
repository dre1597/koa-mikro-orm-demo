import Router from 'koa-router';
import { createBook, getAllBooks, getBookById, updateBook } from '../services/book.service';
import { getAuthorById } from '../services/author.service';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = await getAllBooks();
});

router.get('/:id', async (ctx) => {
  try {
    const book = await getBookById(Number(ctx.params.id));

    if (!book) {
      return ctx.throw(404, { message: 'Book not found' });
    }

    ctx.body = book;
  } catch (e: any) {
    console.error(e);
    return ctx.throw(400, { message: e.message });
  }
});

router.post('/', async (ctx) => {
  const title = ctx.request.body.title;
  const authorId = ctx.request.body.authorId;

  if (!title || !authorId) {
    return ctx.throw(400, { message: 'Title and authorId are required' });
  }

  const author = await getAuthorById(Number(authorId));

  if (!author) {
    return ctx.throw(404, { message: 'Author not found' });
  }

  try {
    ctx.body = await createBook(title, author);
  } catch (e: any) {
    console.error(e);
    return ctx.throw(400, { message: e.message });
  }
});

router.put('/:id', async (ctx) => {
  const title = ctx.request.body.title;
  const authorId = ctx.request.body.authorId;

  const book = await getBookById(Number(ctx.params.id));

  if (!book) {
    return ctx.throw(404, { message: 'Book not found' });
  }

  const author = await getAuthorById(Number(authorId));

  if (!author) {
    return ctx.throw(404, { message: 'Author not found' });
  }

  ctx.body = await updateBook(book, title, author);
});

export const BookController = router;
