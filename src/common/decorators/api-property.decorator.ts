import { applyDecorators } from '@nestjs/common';
import {
  ApiProperty as SwaggerApiProperty,
  ApiPropertyOptional as SwaggerApiPropertyOptional,
  ApiPropertyOptions,
} from '@nestjs/swagger';
import { Expose } from 'class-transformer';
import {
  ArrayMaxSize,
  ArrayMinSize,
  IsAlpha,
  IsAlphanumeric,
  IsArray,
  IsAscii,
  IsBase32,
  IsBase58,
  IsBase64,
  IsBIC,
  IsBoolean,
  IsBtcAddress,
  IsCreditCard,
  IsCurrency,
  IsDataURI,
  IsDate,
  IsDecimal,
  IsEAN,
  IsEmail,
  IsEnum,
  IsEthereumAddress,
  IsFirebasePushId,
  IsFQDN,
  IsFullWidth,
  IsHalfWidth,
  IsHash,
  IsHexadecimal,
  IsHexColor,
  IsHSL,
  IsIBAN,
  IsIdentityCard,
  IsIP,
  IsISBN,
  IsISIN,
  IsISO31661Alpha2,
  IsISO31661Alpha3,
  IsISO31661Numeric,
  IsISO4217CurrencyCode,
  IsISO6391,
  IsISO8601,
  IsISRC,
  IsISSN,
  IsJSON,
  IsJWT,
  IsLatitude,
  IsLatLong,
  IsLocale,
  IsLongitude,
  IsLowercase,
  IsMACAddress,
  IsMagnetURI,
  IsMilitaryTime,
  IsMimeType,
  IsMobilePhone,
  IsMongoId,
  IsMultibyte,
  IsNotEmpty,
  IsNumber,
  IsNumberString,
  IsOctal,
  IsOptional,
  IsPassportNumber,
  IsPhoneNumber,
  IsPort,
  IsPostalCode,
  IsRFC3339,
  IsRgbColor,
  IsSemVer,
  IsString,
  IsStrongPassword,
  IsSurrogatePair,
  IsTaxId,
  IsTimeZone,
  IsUppercase,
  IsUrl,
  IsUUID,
  IsVariableWidth,
  Max,
  MaxLength,
  Min,
  MinLength,
  ValidationOptions,
} from 'class-validator';
import { snakeCase } from 'change-case';

const STRING_TYPES = ['string', 'text', 'character'] as const;
const NUMBER_TYPES = ['integer', 'float', 'smallint', 'bigint'] as const;
const INTEGER_TYPES = ['integer', 'smallint', 'bigint'] as const;
const DATE_TYPES = ['datetime', 'date', 'time'] as const;

export type ApiPropertyType =
  | (typeof STRING_TYPES)[number]
  | (typeof NUMBER_TYPES)[number]
  | (typeof DATE_TYPES)[number]
  | 'uuid'
  | 'enum'
  | 'boolean';

export type ApiPropertyFormat =
  | 'Alpha'
  | 'Alphanumeric'
  | 'Ascii'
  | 'Base32'
  | 'Base58'
  | 'Base64'
  | 'BIC'
  | 'BtcAddress'
  | 'CreditCard'
  | 'Currency'
  | 'DataURI'
  | 'Decimal'
  | 'EAN'
  | 'Email'
  | 'EthereumAddress'
  | 'FirebasePushId'
  | 'FQDN'
  | 'FullWidth'
  | 'HalfWidth'
  | 'Hash'
  | 'Hexadecimal'
  | 'HexColor'
  | 'HSL'
  | 'IBAN'
  | 'IdentityCard'
  | 'IP'
  | 'ISBN'
  | 'ISIN'
  | 'ISO31661Alpha2'
  | 'ISO31661Alpha3'
  | 'ISO31661Numeric'
  | 'ISO4217CurrencyCode'
  | 'ISO6391'
  | 'ISO8601'
  | 'ISRC'
  | 'ISSN'
  | 'JSON'
  | 'JWT'
  | 'Latitude'
  | 'LatLong'
  | 'Locale'
  | 'Longitude'
  | 'Lowercase'
  | 'MACAddress'
  | 'MagnetURI'
  | 'MilitaryTime'
  | 'MimeType'
  | 'MobilePhone'
  | 'MongoId'
  | 'Multibyte'
  | 'NumberString'
  | 'Octal'
  | 'PassportNumber'
  | 'PhoneNumber'
  | 'Port'
  | 'PostalCode'
  | 'RFC3339'
  | 'RgbColor'
  | 'SemVer'
  | 'StrongPassword'
  | 'SurrogatePair'
  | 'TaxId'
  | 'TimeZone'
  | 'Uppercase'
  | 'Url'
  | 'VariableWidth';

const FORMAT_VALIDATORS: Record<
  ApiPropertyFormat,
  (...args: any[]) => PropertyDecorator
> = {
  Alpha: IsAlpha,
  Alphanumeric: IsAlphanumeric,
  Ascii: IsAscii,
  Base32: IsBase32,
  Base58: IsBase58,
  Base64: IsBase64,
  BIC: IsBIC,
  BtcAddress: IsBtcAddress,
  CreditCard: IsCreditCard,
  Currency: IsCurrency,
  DataURI: IsDataURI,
  Decimal: IsDecimal,
  EAN: IsEAN,
  Email: IsEmail,
  EthereumAddress: IsEthereumAddress,
  FirebasePushId: IsFirebasePushId,
  FQDN: IsFQDN,
  FullWidth: IsFullWidth,
  HalfWidth: IsHalfWidth,
  Hash: IsHash,
  Hexadecimal: IsHexadecimal,
  HexColor: IsHexColor,
  HSL: IsHSL,
  IBAN: IsIBAN,
  IdentityCard: IsIdentityCard,
  IP: IsIP,
  ISBN: IsISBN,
  ISIN: IsISIN,
  ISO31661Alpha2: IsISO31661Alpha2,
  ISO31661Alpha3: IsISO31661Alpha3,
  ISO31661Numeric: IsISO31661Numeric,
  ISO4217CurrencyCode: IsISO4217CurrencyCode,
  ISO6391: IsISO6391,
  ISO8601: IsISO8601,
  ISRC: IsISRC,
  ISSN: IsISSN,
  JSON: IsJSON,
  JWT: IsJWT,
  Latitude: IsLatitude,
  LatLong: IsLatLong,
  Locale: IsLocale,
  Longitude: IsLongitude,
  Lowercase: IsLowercase,
  MACAddress: IsMACAddress,
  MagnetURI: IsMagnetURI,
  MilitaryTime: IsMilitaryTime,
  MimeType: IsMimeType,
  MobilePhone: IsMobilePhone,
  MongoId: IsMongoId,
  Multibyte: IsMultibyte,
  NumberString: IsNumberString,
  Octal: IsOctal,
  PassportNumber: IsPassportNumber,
  PhoneNumber: IsPhoneNumber,
  Port: IsPort,
  PostalCode: IsPostalCode,
  RFC3339: IsRFC3339,
  RgbColor: IsRgbColor,
  SemVer: IsSemVer,
  StrongPassword: IsStrongPassword,
  SurrogatePair: IsSurrogatePair,
  TaxId: IsTaxId,
  TimeZone: IsTimeZone,
  Uppercase: IsUppercase,
  Url: IsUrl,
  VariableWidth: IsVariableWidth,
};

const SELECTABLE_FORMATS = new Set<ApiPropertyFormat>([
  'IdentityCard',
  'PassportNumber',
  'IP',
  'PostalCode',
  'ISBN',
  'MobilePhone',
  'PhoneNumber',
  'Hash',
]);

function format2Swagger(
  format: ApiPropertyFormat | undefined,
  formatOption: string | number | undefined,
): string | undefined {
  switch (format) {
    case 'Email':
      return 'email';
    case 'StrongPassword':
      return 'password';
    case 'IP':
      return String(formatOption) === '4' ? 'ipv4' : 'ipv6';
    case 'FQDN':
      return 'idn-hostname';
    case 'Url':
      return 'uri';
    default:
      return undefined;
  }
}

export type ApiPropertyConfig = {
  name: string;
  type: ApiPropertyType;
  enum?: object;
  nullable?: boolean;
  array?: boolean;
  /** Include the @ApiProperty / @ApiPropertyOptional swagger decorator. Default: true. */
  swagger?: boolean;
  /** Include class-validator decorators. Default: false. */
  addValidator?: boolean;
  format?: ApiPropertyFormat;
  formatOption?: string | number;
  minLength?: number;
  maxLength?: number;
  minNumber?: number;
  maxNumber?: number;
  minItems?: number;
  maxItems?: number;
  example?: unknown;
  uuidVersion?: 'any' | '1' | '3' | '4' | '5' | '6' | '7';
};

function buildSwaggerOptions(config: ApiPropertyConfig): ApiPropertyOptions {
  const opts: ApiPropertyOptions = { name: snakeCase(config.name) };

  if (config.type === 'enum' && config.enum) {
    opts.type = 'string';
    opts.enum = config.enum;
  }

  if (config.addValidator) {
    if ((STRING_TYPES as readonly string[]).includes(config.type)) {
      opts.type = 'string';
      const fmt = format2Swagger(config.format, config.formatOption);
      if (fmt) opts.format = fmt;
      if (
        config.minLength !== undefined &&
        config.minLength > 0 &&
        config.type !== 'character'
      ) {
        opts.minLength = config.minLength;
      }
      if (config.maxLength !== undefined && config.maxLength > 0) {
        if (config.type === 'character') opts.minLength = config.maxLength;
        opts.maxLength = config.maxLength;
      }
    }

    if (config.type === 'uuid') {
      opts.type = 'string';
      opts.format = 'uuid';
    }

    if ((DATE_TYPES as readonly string[]).includes(config.type)) {
      opts.type = 'string';
      opts.format = 'datetime';
    }

    if ((NUMBER_TYPES as readonly string[]).includes(config.type)) {
      opts.type = (INTEGER_TYPES as readonly string[]).includes(config.type)
        ? 'integer'
        : 'number';
      if (config.minNumber !== undefined && config.minNumber >= 0) {
        opts.minimum = config.minNumber;
      }
      if (config.maxNumber !== undefined && config.maxNumber >= 0) {
        opts.maximum = config.maxNumber;
      }
    }

    if (config.type === 'boolean') {
      opts.type = 'boolean';
    }
  }

  if (config.array) {
    opts.isArray = true;
    if (config.minItems !== undefined && config.minItems >= 0) {
      opts.minItems = config.minItems;
    }
    if (config.maxItems !== undefined && config.maxItems >= 0) {
      opts.maxItems = config.maxItems;
    }
  }

  if (config.example !== undefined) {
    opts.example = config.array ? [config.example] : config.example;
  }

  return opts;
}

function buildValidatorDecorators(
  config: ApiPropertyConfig,
): PropertyDecorator[] {
  const decorators: PropertyDecorator[] = [];
  const validationOptions: ValidationOptions = config.array
    ? { each: true }
    : {};

  decorators.push(
    config.nullable
      ? IsOptional(validationOptions)
      : IsNotEmpty(validationOptions),
  );

  if (config.array) {
    decorators.push(IsArray());
    if (config.minItems !== undefined && config.minItems >= 0) {
      decorators.push(ArrayMinSize(config.minItems));
    }
    if (config.maxItems !== undefined && config.maxItems >= 0) {
      decorators.push(ArrayMaxSize(config.maxItems));
    }
  }

  if (config.type === 'enum' && config.enum) {
    decorators.push(IsEnum(config.enum, validationOptions));
  }

  if (config.type === 'boolean') {
    decorators.push(IsBoolean(validationOptions));
  }

  if ((NUMBER_TYPES as readonly string[]).includes(config.type)) {
    decorators.push(IsNumber({}, validationOptions));
    if (config.minNumber !== undefined && config.minNumber >= 0) {
      decorators.push(Min(config.minNumber, validationOptions));
    }
    if (config.maxNumber !== undefined && config.maxNumber >= 0) {
      decorators.push(Max(config.maxNumber, validationOptions));
    }
  }

  if ((STRING_TYPES as readonly string[]).includes(config.type)) {
    decorators.push(IsString(validationOptions));

    if (config.format) {
      const FormatDecorator = FORMAT_VALIDATORS[config.format];
      if (FormatDecorator) {
        const args: unknown[] = SELECTABLE_FORMATS.has(config.format)
          ? [config.formatOption, validationOptions]
          : [validationOptions];
        decorators.push(FormatDecorator(...args));
      }
    }

    if (
      config.minLength !== undefined &&
      config.minLength >= 0 &&
      config.type !== 'character'
    ) {
      decorators.push(MinLength(config.minLength, validationOptions));
    }
    if (config.maxLength !== undefined && config.maxLength >= 0) {
      if (config.type === 'character') {
        decorators.push(MinLength(config.maxLength, validationOptions));
      }
      decorators.push(MaxLength(config.maxLength, validationOptions));
    }
  }

  if ((DATE_TYPES as readonly string[]).includes(config.type)) {
    decorators.push(IsDate(validationOptions));
  }

  if (config.type === 'uuid') {
    const version =
      config.uuidVersion && config.uuidVersion !== 'any'
        ? config.uuidVersion
        : undefined;
    decorators.push(IsUUID(version, validationOptions));
  }

  return decorators;
}

export function ApiProperty(config: ApiPropertyConfig): PropertyDecorator {
  const decorators: PropertyDecorator[] = [];

  if (config.swagger !== false) {
    const opts = buildSwaggerOptions(config);
    decorators.push(
      config.nullable
        ? SwaggerApiPropertyOptional(opts)
        : SwaggerApiProperty(opts),
    );
  }

  decorators.push(Expose({ name: snakeCase(config.name) }));

  if (config.addValidator) {
    decorators.push(...buildValidatorDecorators(config));
  }

  return applyDecorators(...decorators);
}
