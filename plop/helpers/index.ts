import type { NodePlopAPI } from 'plop';

import isDbStringType from './is-db-string-type';
import isDbLength from './is-db-length';
import isDateType from './is-date-type';
import dbType2Ts from './db-type-to-ts';
import isStringType from './is-string-type';
import isNumberType from './is-number-type';
import isIntegerType from './is-integer-type';
import format2Swagger from './format-to-swagger';
import isSelectableFormat from './is-selectable-format';
import quoteList from './quote-list';
import isRelation from './is-relation';
import isCollectionRelation from './is-collection-relation';
import operators from './operators';

const helpers: ((plop: NodePlopAPI) => void)[] = [
  isNumberType,
  isSelectableFormat,
  format2Swagger,
  isDbStringType,
  isDbLength,
  dbType2Ts,
  quoteList,
  isRelation,
  isCollectionRelation,
  ...operators,
  isIntegerType,
  isStringType,
  isDateType,
];

export default helpers;
