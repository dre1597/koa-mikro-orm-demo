import { SqlHighlighter } from '@mikro-orm/sql-highlighter';
import { defineConfig } from '@mikro-orm/sqlite';

import { BaseEntity } from './common/entities/base-entity';
import { Author } from './entities/author.entity';
import { Book } from './entities/book.entity';
import { BookTag } from './entities/book-tag.entity';
import { Publisher } from './entities/publisher.entity';

const ormConfig = defineConfig({
  dbName: 'db.sqlite',
  highlighter: new SqlHighlighter(),
  debug: true,
  entities: [Author, Book, BookTag, Publisher, BaseEntity],
});

export default ormConfig;
