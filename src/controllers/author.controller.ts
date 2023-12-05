import Router from 'koa-router';
import { createAuthor, getAllAuthors, getAuthorById, updateAuthor } from '../services/author.service';

const router = new Router();

router.get('/', async (ctx) => {
  ctx.body = await getAllAuthors();
});

router.get('/:id', async (ctx) => {
  try {
    const author = await getAuthorById(Number(ctx.params.id));

    if (!author) {
      return ctx.throw(404, { message: 'Author not found' });
    }

    ctx.body = author;
  } catch (e: any) {
    console.error(e);
    return ctx.throw(400, { message: e.message });
  }
});

router.post('/', async (ctx) => {
  const name = ctx.request.body.name;
  const email = ctx.request.body.email;

  if (!name || !email) {
    return ctx.throw(400, { message: 'Name is required' });
  }

  try {
    ctx.body = await createAuthor(name, email);
  } catch (e: any) {
    console.error(e);
    return ctx.throw(400, { message: e.message });
  }
});


router.put('/:id', async (ctx) => {
  const name = ctx.request.body.name;
  const email = ctx.request.body.email;

  const author = await getAuthorById(Number(ctx.params.id));

  if (!author) {
    return ctx.throw(404, { message: 'Author not found' });
  }

  ctx.body = await updateAuthor(author, name, email);
});


export const AuthorController = router;
