import { IsNotEmpty, IsString } from 'class-validator';
import { IsSolanaPublicKey } from './is-solana-public-key.validator';
import { ApiProperty } from '@nestjs/swagger';

export class ChallengeRequestDTO {
  @ApiProperty({
    description: 'User wallet',
  })
  @IsNotEmpty()
  @IsString()
  @IsSolanaPublicKey()
  walletAddress: string;
}
