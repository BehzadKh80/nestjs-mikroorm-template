import { repl } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';

async function bootstrap() {
  process.env['ORM_GLOBAL_CONTEXT'] = 'true';
  const replServer = await repl(AppModule);
  replServer.setupHistory('.nestjs_repl_history', (err) => {
    if (err) {
      console.error(err);
    }
  });
}
void bootstrap();
