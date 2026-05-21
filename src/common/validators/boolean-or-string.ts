import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isString,
  isBoolean,
} from 'class-validator';

@ValidatorConstraint({ name: 'booleanOrString', async: false })
export class BooleanOrString implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    return isString(value) || isBoolean(value);
  }

  defaultMessage() {
    return 'Text ($value) is not FQDN or IP!';
  }
}
