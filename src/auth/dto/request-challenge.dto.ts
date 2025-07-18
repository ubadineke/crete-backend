import { IsNotEmpty, IsString } from 'class-validator';
import { IsSolanaPublicKey } from './is-solana-public-key.validator';

export class ChallengeRequestDTO {
  @IsNotEmpty()
  @IsString()
  @IsSolanaPublicKey()
  walletAddress: string;
}
