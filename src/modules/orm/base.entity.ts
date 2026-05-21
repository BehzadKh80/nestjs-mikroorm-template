import { defineEntity, p } from '@mikro-orm/core';
import { ApiProperty } from '@nestjs/swagger';
import { v7 } from 'uuid';
// import { PrimaryKey, Property } from '@mikro-orm/decorators/legacy';
// import { ApiProperty } from '@nestjs/swagger';
export class Base {
  @ApiProperty()
  id!: string;

  @ApiProperty({
    name: 'created_at',
  })
  createdAt?: Date;

  @ApiProperty({
    name: 'updated_at',
  })
  updatedAt?: Date;
}

export const BaseEntity = defineEntity({
  name: 'Base',
  abstract: true,
  class: Base,
  properties: {
    id: p
      .uuid()
      .primary()
      .onCreate(() => v7()),
    createdAt: p
      .datetime()
      .onCreate(() => new Date())
      .serializedName('created_at'),
    updatedAt: p
      .datetime()
      .onCreate(() => new Date())
      .onUpdate(() => new Date())
      .serializedName('updated_at'),
  },
});

// export class Base {
//   @ApiProperty()
//   @PrimaryKey({
//     type: 'uuid',
//     onCreate: () => v7(),
//   })
//   id!: string;

//   @ApiProperty()
//   @Property({
//     type: 'datetime',
//     onCreate: () => new Date(),
//     serializedName: 'created_at',
//   })
//   createdAt!: Date;

//   @ApiProperty()
//   @Property({
//     type: 'datetime',
//     onCreate: () => new Date(),
//     onUpdate: () => new Date(),
//     serializedName: 'updated_at',
//   })
//   updatedAt!: Date;
// }
