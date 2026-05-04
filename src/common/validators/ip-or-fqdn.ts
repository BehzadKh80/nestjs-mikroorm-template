import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  ValidationArguments,
  isFQDN,
  isIP,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'ipOrFqdn', async: false })
export class IpOrFqdn implements ValidatorConstraintInterface {
  validate(value: any, _?: ValidationArguments): Promise<boolean> | boolean {
    return isFQDN(value) || isIP(value);
  }

  defaultMessage(_: ValidationArguments) {
    return 'Text ($value) is not FQDN or IP!';
  }
}

export const IsIpOrFqdn = () => Validate(IpOrFqdn);
