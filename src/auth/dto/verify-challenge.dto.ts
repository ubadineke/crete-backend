import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { IsSolanaPublicKey } from './is-solana-public-key.validator';

export class VerifyChallengeDTO {
  @IsNotEmpty()
  @IsString()
  @IsSolanaPublicKey()
  walletAddress;

  @IsNotEmpty()
  @IsString()
  @IsJWT()
  challengeToken;

  @IsNotEmpty()
  @IsString()
  signature;
}
