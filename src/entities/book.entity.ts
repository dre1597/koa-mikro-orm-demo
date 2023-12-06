import { Cascade, Collection, Entity, ManyToMany, ManyToOne, Property, StringType } from '@mikro-orm/core';

import { BaseEntity } from '../common/entities/base-entity';
import { Author } from './author.entity';
import { BookTag } from './book-tag.entity';
import { Publisher } from './publisher.entity';

@Entity()
export class Book extends BaseEntity {
  @Property({ type: StringType })
  title!: string;

  authorId?: number;

  @ManyToOne(() => Author)
  author!: Author;

  @ManyToOne(() => Publisher, { cascade: [Cascade.PERSIST, Cascade.REMOVE], nullable: true })
  publisher?: Publisher;

  @ManyToMany(() => BookTag)
  tags = new Collection<BookTag>(this);

  constructor(title: string, author: Author) {
    super();
    this.title = title;
    this.author = author;
  }
}
