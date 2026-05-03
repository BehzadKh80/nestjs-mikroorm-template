import { AcceptLanguageResolver, I18nAsyncOptions } from 'nestjs-i18n';
import { join } from 'path';

export const i18nOptions: I18nAsyncOptions = {
  useFactory: () => {
    return {
      fallbackLanguage: 'en',
      loaderOptions: {
        path: join(process.cwd(), '/i18n/'),
        watch: true,
      },
      logging: false,
      typesOutputPath: join(
        process.cwd(),
        'src/modules/i18n/i18n.generated.ts',
      ),
    };
  },
  resolvers: [AcceptLanguageResolver],
};
