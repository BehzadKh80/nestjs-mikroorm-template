import { defineEntity, p } from '@mikro-orm/core';
import { BaseEntity } from '../../orm/base.entity';
import { UserRepository } from '../repositories/user.repository';

export const UserEntity = defineEntity({
  name: 'User',
  extends: BaseEntity,
  properties: {
    email: p.string().length(254).unique(),
    password: p.character().length(96).lazy().hidden(),
    firstName: p.string().length(32).nullable().serializedName('first_name'),
    lastName: p.string().length(32).nullable().serializedName('last_name'),
  },
  repository: () => UserRepository,
});

export class User extends UserEntity.class {
  //[EntityRepositoryType]?: UserRepository;
}
UserEntity.setClass(User);
