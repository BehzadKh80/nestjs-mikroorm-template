import type { NodePlopAPI } from 'plop';

import logicalEqual from './eq';
import logicalNotEqual from './neq';
import logicalAnd from './and';
import logicalOr from './or';
import logicalNot from './not';
import logicalGreaterThan from './gt';
import logicalGreaterThanOrEqual from './gte';
import logicalLessThan from './lt';
import logicalLessThanOrEqual from './lte';

const operators: ((plop: NodePlopAPI) => void)[] = [
  logicalEqual,
  logicalNotEqual,
  logicalAnd,
  logicalOr,
  logicalNot,
  logicalGreaterThan,
  logicalGreaterThanOrEqual,
  logicalLessThan,
  logicalLessThanOrEqual,
];

export default operators;
