import 'reflect-metadata';

import { EntityManager, EntityRepository, MikroORM, RequestContext } from '@mikro-orm/core';
import Koa from 'koa';
import bodyParser from 'koa-body';
import Router from 'koa-router';

import { AuthorController } from './controllers/author.controller';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import ormConfig from './mikro-orm.config';

export const DI = {} as {
  orm: MikroORM,
  em: EntityManager,
  authorRepository: EntityRepository<Author>,
  bookRepository: EntityRepository<Book>,
};

export const app = new Koa();
const api = new Router();

api.use('/authors', AuthorController.routes());

const port = process.env.PORT || 3000;

(async () => {
  DI.orm = await MikroORM.init(ormConfig);

  DI.em = DI.orm.em;
  DI.authorRepository = DI.orm.em.getRepository(Author);
  DI.bookRepository = DI.orm.em.getRepository(Book);

  app.use(bodyParser());
  app.use((ctx, next) => RequestContext.createAsync(DI.orm.em, next));
  app.use(api.routes());
  app.use(api.allowedMethods());
  app.use((ctx, next) => {
    ctx.status = 404;
    ctx.body = { message: 'No route found' };
  });

  app.listen(port, () => {
    console.log(`Server listening on http://localhost:${port}`);
  });
})();
