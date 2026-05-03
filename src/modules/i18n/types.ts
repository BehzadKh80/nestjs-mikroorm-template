import { I18nService } from 'nestjs-i18n';
import { I18nTranslations } from './i18n.generated';

export type I18n = I18nService<I18nTranslations>;
