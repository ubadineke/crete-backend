import { PublicKey } from '@solana/web3.js';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsSolanaPublicKey(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSolanPublicKey',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          try {
            new PublicKey(value);
            return true;
          } catch (error) {
            return false;
          }
        },

        defaultMessage(args: ValidationArguments): string {
          return `${args.property} field contains an invalid solana public key`;
        },
      },
    });
  };
}
