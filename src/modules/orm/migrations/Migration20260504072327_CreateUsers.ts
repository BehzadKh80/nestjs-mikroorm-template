import { Migration } from '@mikro-orm/migrations';

export class Migration20260504072327_CreateUsers extends Migration {

  override up(): void | Promise<void> {
    this.addSql(`create table "user" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, "email" varchar(254) not null, "password" char(96) not null, "first_name" varchar(32) null, "last_name" varchar(32) null, primary key ("id"));`);
    this.addSql(`alter table "user" add constraint "user_email_unique" unique ("email");`);
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "user" cascade;`);
  }

}
