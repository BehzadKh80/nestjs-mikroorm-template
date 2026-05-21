import { defineEntity, p } from '@mikro-orm/core';
import { Base, BaseEntity } from '../../orm/base.entity';
import { UserRepository } from '../repositories/user.repository';

// import { Entity, Property } from '@mikro-orm/decorators/legacy';
// import { Base } from '../../orm/base.entity';
// import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
// import { BaseEntity, defineEntity, p } from '@mikro-orm/core';
// import { UserRepository } from '../repositories/user.repository';

export class User extends Base {
  email!: string;
  password!: string;
  firstName?: string;
  lastName?: string;
}

export const UserEntity = defineEntity({
  name: 'User',
  extends: BaseEntity,
  class: User,
  properties: {
    email: p.string().length(254).unique(),
    password: p.character().length(96).lazy().hidden(),
    firstName: p.string().length(32).nullable().serializedName('first_name'),
    lastName: p.string().length(32).nullable().serializedName('last_name'),
  },
  repository: () => UserRepository,
});

// export class User extends UserEntity.class {
//   //[EntityRepositoryType]?: UserRepository;
// }
// UserEntity.setClass(User);

// @Entity()
// export class User extends Base {
//   @ApiProperty()
//   @Property({ type: 'string', length: 254, unique: true })
//   email!: string;

//   @ApiProperty()
//   @Property({ type: 'character', length: 96, lazy: true, hidden: true })
//   password!: string;

//   @ApiPropertyOptional()
//   @Property({
//     type: 'string',
//     length: 32,
//     nullable: true,
//     serializedName: 'first_name',
//   })
//   firstName!: string;

//   @ApiPropertyOptional()
//   @Property({
//     type: 'string',
//     length: 32,
//     nullable: true,
//     serializedName: 'last_name',
//   })
//   lastName!: string;
// }
