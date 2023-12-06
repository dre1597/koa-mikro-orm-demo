import { DI } from '../index';
import { QueryOrder } from '@mikro-orm/core';
import { Author } from '../entities/author.entity';
import { Book } from '../entities/book.entity';

export async function getAllBooks() {
  return await DI.bookRepository.findAll({
    fields: ['id', 'title', 'author', 'publisher', 'tags'],
    orderBy: { title: QueryOrder.DESC },
    limit: 10
  });
}

export async function getBookById(id: number) {
  return await DI.bookRepository.findOne({
    id,
  }, {
    fields: ['id', 'title', 'author', 'publisher', 'tags'],
  });
}

export async function createBook(title: string, author: Author) {
  const book = new Book(title, author);

  await DI.em.persistAndFlush(book);

  return book;
}

export async function updateBook(book: Book, title: string, author: Author) {
  DI.em.assign(book, {
    title,
    author,
  });

  await DI.em.persistAndFlush(book);

  return book;
}
