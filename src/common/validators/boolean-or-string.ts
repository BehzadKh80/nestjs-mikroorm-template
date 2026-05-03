import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isString,
  isBoolean,
} from 'class-validator';

@ValidatorConstraint({ name: 'booleanOrString', async: false })
export class BooleanOrString implements ValidatorConstraintInterface {
  validate(value: any, _?: ValidationArguments): Promise<boolean> | boolean {
    return isString(value) || isBoolean(value);
  }

  defaultMessage(_: ValidationArguments) {
    return 'Text ($value) is not FQDN or IP!';
  }
}
