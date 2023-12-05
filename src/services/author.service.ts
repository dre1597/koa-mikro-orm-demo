import { QueryOrder } from '@mikro-orm/core';

import { DI } from '../index';
import { Author } from '../entities/author.entity';

export async function getAllAuthors() {
  return await DI.authorRepository.findAll({
    fields: ['id', 'name', 'email', 'books'],
    orderBy: { name: QueryOrder.DESC },
    limit: 10
  });
}

export async function getAuthorById(id: number) {
  return await DI.authorRepository.findOne({
    id,
  }, {
    fields: ['id', 'name', 'email', 'books'],
  });
}

export async function createAuthor(name: string, email: string) {
  const author = new Author(name, email);

  await DI.em.persist(author).flush();

  return author;
}

export async function updateAuthor(author: Author, name: string, email: string) {
  DI.em.assign(author, {
    name,
    email,
  });

  await DI.em.persistAndFlush(author);

  return author;
}
