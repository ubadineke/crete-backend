import { PublicKey } from '@solana/web3.js';
import BN from 'bn.js';
import { Transform, Type } from 'class-transformer';
import {
  IsIn,
  IsNotEmpty,
  IsNumber,
  IsOptional,
  IsString,
  ValidateNested,
} from 'class-validator';
import { IsSolanaPublicKey } from 'src/auth/dto/is-solana-public-key.validator';

class MintMaxVoteWeightSourceDTO {
  @IsIn(['supplyFraction', 'absolute'])
  type: 'supplyFraction' | 'absolute';

  @IsString()
  // @Transform(({ value }) => new BN(value))
  amount: BN;
}

export class CreateDaoDTO {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsSolanaPublicKey()
  // @Transform(({ value }) => new PublicKey(value))
  communityTokenMint: string;

  @IsNotEmpty()
  @IsNumber()
  minCommunityWeightToCreateGovernance: number;

  @IsNotEmpty()
  @IsSolanaPublicKey()
  // @Transform(({ value }) => new PublicKey(value))
  payer: string;

  @IsOptional()
  @IsSolanaPublicKey()
  // @Transform(({ value }) => (value ? new PublicKey(value) : undefined))
  councilTokenMint?: string;

  @IsOptional()
  @ValidateNested()
  @Type(() => MintMaxVoteWeightSourceDTO)
  communityMintMaxVoterWeightSource: MintMaxVoteWeightSourceDTO;

  @IsOptional()
  @IsIn(['liquid', 'membership', 'dormant'])
  communityTokenType?: 'liquid' | 'membership' | 'dormant';

  @IsOptional()
  @IsIn(['liquid', 'membership', 'dormant'])
  councilTokenType?: 'liquid' | 'membership' | 'dormant';

  @IsOptional()
  @IsSolanaPublicKey()
  // @Transform(({ value }) => (value ? new PublicKey(value) : undefined))
  communityVoterWeightAddinProgramId?: string;

  @IsOptional()
  @IsSolanaPublicKey()
  // @Transform(({ value }) => (value ? new PublicKey(value) : undefined))
  maxCommunityVoterWeightAddinProgramId?: string;

  @IsOptional()
  @IsSolanaPublicKey()
  // @Transform(({ value }) => (value ? new PublicKey(value) : undefined))
  councilVoterWeightAddinProgramId?: string;

  @IsOptional()
  @IsSolanaPublicKey()
  // @Transform(({ value }) => (value ? new PublicKey(value) : undefined))
  maxCouncilVoterWeightAddinProgramId?: string;
}
