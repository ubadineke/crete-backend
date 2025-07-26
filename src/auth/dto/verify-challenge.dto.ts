import { IsJWT, IsNotEmpty, IsString } from 'class-validator';
import { IsSolanaPublicKey } from './is-solana-public-key.validator';
import { ApiProperty } from '@nestjs/swagger';

export class VerifyChallengeDTO {
  @ApiProperty({
    description: 'User wallet',
  })
  @IsNotEmpty()
  @IsString()
  @IsSolanaPublicKey()
  walletAddress: string;

  @ApiProperty({
    description: 'Raw JWT from first step sent as response',
  })
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  challengeToken: string;

  @ApiProperty({
    description: 'signed transaction with the JWT as message',
  })
  @IsNotEmpty()
  @IsString()
  signature: string;
}
