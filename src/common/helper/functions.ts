import { ConfigFactoryKeyHost, registerAs } from '@nestjs/config';
import { ClassConstructor, plainToInstance } from 'class-transformer';
import { isNumberString, validateSync } from 'class-validator';
import { FALSE_STRINGS, TRUE_STRINGS } from '../constants';

export const promiseTimeout = (
  ms: number,
  promise: Promise<unknown>,
): Promise<unknown> => {
  let timer: NodeJS.Timeout;

  return Promise.race([
    promise,
    new Promise((_, reject) => {
      timer = setTimeout(
        () => reject(new Error(`Operations timed out after ${String(ms)}.`)),
        ms,
      );
    }),
  ]).finally(() => {
    clearTimeout(timer);
  });
};

export const isNullish = (value: unknown): value is undefined | null =>
  value === undefined || value === null;

export const removeLineBreaks = (text: string): string => {
  return text.replace(/(\r\n|\n|\r)/gm, ' ').replace(/\s+/g, ' ');
};

export const parseUsedMemory = (info: string): number => {
  const start = info.indexOf('used_memory');
  const end = info.indexOf('used_memory_human') - 1;
  if (start < 0 || end < 0) return 0;
  return Number.parseInt(info.slice(start, end).split(':')[1] ?? '', 10);
};

export function getDateString(): string {
  const today = new Date();
  const year = today.getFullYear();
  const month = String(today.getMonth() + 1).padStart(2, '0');
  const day = String(today.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

export function fileSelectQuery(alias: string): string {
  return `
  jsonb_build_object(
    'id', ${alias}.id,
    'fileName', ${alias}.file_name,
    'mimeType', ${alias}.mime_type,
    'savedPath', ${alias}.saved_path
  )`;
}

export function isExactlyOneDayApart(date1: Date, date2: Date) {
  const diffInMs = Math.abs(date1.getTime() - date2.getTime());
  return diffInMs === 24 * 60 * 60 * 1000;
}

export function isOneDayInterval(date1: Date, date2: Date): boolean {
  const d1 = new Date(date1);
  const d2 = new Date(date2);

  d1.setHours(0, 0, 0, 0);
  d2.setHours(0, 0, 0, 0);

  const diffInMs = Math.abs(d2.getTime() - d1.getTime());
  return diffInMs === 24 * 60 * 60 * 1000;
}

export function createValidatedConfig<T extends object>(
  token: string,
  cls: ClassConstructor<T>,
): (() => T) & ConfigFactoryKeyHost<T> {
  return registerAs(token, (): T => {
    const validated = plainToInstance(cls, process.env, {
      enableImplicitConversion: true,
      excludeExtraneousValues: true,
    });

    const errors = validateSync(validated, {
      skipMissingProperties: false,
      stopAtFirstError: true,
    });

    if (errors.length > 0) {
      throw new Error(errors.toString());
    }

    return validated;
  });
}

export function transformString(value: any, fallback: string): string {
  if (typeof value === 'string') {
    return value ?? fallback;
  }
  return fallback;
}

export function transformNumber(value: any, fallback: number): number {
  if (typeof value === 'number') {
    return value ?? fallback;
  }
  if (isNumberString(value)) {
    return Number(value);
  }
  return fallback;
}

export function transformBoolean(value: any, fallback: boolean): boolean {
  if (typeof value === 'boolean') {
    return value;
  } else if (typeof value === 'string') {
    if (TRUE_STRINGS.includes(value.toLowerCase())) {
      return true;
    } else if (FALSE_STRINGS.includes(value.toLowerCase())) {
      return false;
    } else {
      return fallback;
    }
  } else if (typeof value === 'number') {
    if (value === 1) {
      return true;
    } else if (value === 0) {
      return false;
    } else {
      return fallback;
    }
  } else {
    return fallback;
  }
}
