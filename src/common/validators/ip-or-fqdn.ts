import {
  ValidatorConstraint,
  ValidatorConstraintInterface,
  isFQDN,
  isIP,
  Validate,
} from 'class-validator';

@ValidatorConstraint({ name: 'ipOrFqdn', async: false })
export class IpOrFqdn implements ValidatorConstraintInterface {
  validate(value: any): Promise<boolean> | boolean {
    return isFQDN(value) || isIP(value);
  }

  defaultMessage() {
    return 'Text ($value) is not FQDN or IP!';
  }
}

export const IsIpOrFqdn = () => Validate(IpOrFqdn);
