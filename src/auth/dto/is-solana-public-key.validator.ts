import { PublicKey } from '@solana/web3.js';
import {
  registerDecorator,
  ValidationOptions,
  ValidationArguments,
} from 'class-validator';

export function IsSolanaPublicKey(validationOptions?: ValidationOptions) {
  return function (object: Object, propertyName: string) {
    registerDecorator({
      name: 'isSolanaPublicKey',
      target: object.constructor,
      propertyName,
      options: validationOptions,
      validator: {
        validate(value: any, _args: ValidationArguments) {
          if (typeof value !== 'string') {
            return false;
          }

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
