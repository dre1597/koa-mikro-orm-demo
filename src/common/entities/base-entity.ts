import { DateTimeType, IntegerType, PrimaryKey, Property } from '@mikro-orm/core';

export abstract class BaseEntity {
  @PrimaryKey({ autoincrement: true, type: IntegerType })
  id!: number;

  @Property({ onCreate: () => new Date(), type: DateTimeType })
  createdAt = new Date();

  @Property({ onUpdate: () => new Date(), type: DateTimeType })
  updatedAt = new Date();
}
