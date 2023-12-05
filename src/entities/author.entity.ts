import { Cascade, Collection, Entity, ManyToOne, OneToMany, Property, StringType, Unique } from '@mikro-orm/core';

import { BaseEntity } from '../common/entities/base-entity';
import { Book } from './book.entity';

@Entity()
export class Author extends BaseEntity {
  @Property({ type: StringType })
  name!: string;

  @Property({ type: StringType })
  @Unique()
  email!: string;

  @Property({ nullable: true, type: StringType })
  bio?: string;

  @OneToMany(() => Book, b => b.author, { cascade: [Cascade.ALL] })
  books = new Collection<Book>(this);

  @ManyToOne(() => Book, { nullable: true })
  favouriteBook?: Book;

  constructor(name: string, email: string) {
    super();
    this.name = name;
    this.email = email;
  }
}


