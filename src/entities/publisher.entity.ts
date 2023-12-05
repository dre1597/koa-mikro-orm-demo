import { Collection, Entity, Enum, OneToMany, Property, StringType } from '@mikro-orm/core';

import { BaseEntity } from '../common/entities/base-entity';
import { Book } from './book.entity';

export enum PublisherType {
  LOCAL = 'local',
  GLOBAL = 'global',
}

@Entity()
export class Publisher extends BaseEntity {

  @Property({ type: StringType })
  name!: string;

  @Enum(() => PublisherType)
  type!: PublisherType;

  @OneToMany(() => Book, b => b.publisher)
  books = new Collection<Book>(this);

  constructor(name: string, type = PublisherType.LOCAL) {
    super();
    this.name = name;
    this.type = type;
  }
}



