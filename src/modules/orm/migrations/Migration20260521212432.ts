import { Migration } from '@mikro-orm/migrations';

export class Migration20260521212432 extends Migration {
  override up(): void | Promise<void> {
    this.addSql(
      `create table "example" ("id" uuid not null, "created_at" timestamptz not null, "updated_at" timestamptz not null, primary key ("id"));`,
    );
  }

  override down(): void | Promise<void> {
    this.addSql(`drop table if exists "example" cascade;`);
  }
}
