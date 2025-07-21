import { IsNotEmpty, IsString } from 'class-validator';
import { IsSolanaPublicKey } from 'src/auth/dto/is-solana-public-key.validator';

export class GetDaoDTO {
  @IsNotEmpty()
  @IsString()
  @IsSolanaPublicKey()
  publicKey: string;
}
