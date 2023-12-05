import { Collection, Entity, ManyToMany, Property, StringType } from '@mikro-orm/core';

import { BaseEntity } from '../common/entities/base-entity';
import { Book } from './book.entity';

@Entity()
export class BookTag extends BaseEntity {
  @Property({ type: StringType })
  name: string;

  @ManyToMany(() => Book, b => b.tags)
  books: Collection<Book> = new Collection<Book>(this);

  constructor(name: string) {
    super();
    this.name = name;
  }
}
