import { defineEntity, p } from '@mikro-orm/core';
import { v7 } from 'uuid';

export const BaseEntity = defineEntity({
  name: 'Base',
  abstract: true,
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
