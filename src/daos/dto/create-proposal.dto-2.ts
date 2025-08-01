import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  ArrayMinSize,
  IsArray,
  IsBoolean,
  IsEnum,
  IsIn,
  IsOptional,
  IsString,
} from 'class-validator';
import { IsSolanaPublicKey } from 'src/auth/dto/is-solana-public-key.validator';

export enum VoteTypeEnum {
  SINGLE_CHOICE = 'SINGLE_CHOICE',
  MULTI_CHOICE = 'MULTI_CHOICE',
  APPROVAL = 'APPROVAL',
}

export class CreateProposalDto {
  @ApiProperty({ example: 'Upgrade Program XYZ to v1.2.3' })
  @IsString()
  name!: string;

  @ApiProperty({
    example: 'https://gist.github.com/you/some-markdown-or-ipfs-link',
    description: 'Link to a markdown/IPFS/gist description',
  })
  // @IsUrl()
  descriptionLink!: string;

  @ApiProperty({ enum: ['single', 'multi'], example: 'single' })
  @IsString()
  @IsIn(['single', 'multi'])
  voteType!: 'single' | 'multi';

  @ApiProperty({
    type: [String],
    example: ['Approve', 'Reject'],
    description: 'The options that can be voted on.',
  })
  @IsArray()
  @ArrayMinSize(1)
  @IsString({ each: true })
  options!: string[];

  @ApiProperty({ example: true, description: 'Add the built-in Deny option' })
  @IsBoolean()
  useDenyOption!: boolean;

  @ApiProperty({
    example: '9VJv8EcoFQU4iT8J4sf8gdJs7qyYhtUQ7qxrPpPVGMHt',
    description: 'Realm public key',
  })
  @IsString()
  @IsSolanaPublicKey()
  realmAccount!: string;

  @ApiProperty({
    example: 'F3gqCd8rjJaqQy1o9G2X9JgFQ4zWm6qzM9X2kC6oWx2k',
    description: 'Governance account public key (what this proposal targets)',
  })
  @IsString()
  @IsSolanaPublicKey()
  governanceAccount!: string;

  @ApiProperty({
    example: '7xJj3bq8iXqA4d5tP2dP8C7iCkCjvWm1QbZQ3LJjKc4B',
    description:
      'TokenOwnerRecord PDA (realm + governingTokenMint + governingTokenOwner)',
  })
  @IsString()
  @IsSolanaPublicKey()
  tokenOwnerRecord!: string;

  @ApiProperty({
    example: '9MUgScRdYjsfu2gj8KgmqKwenwKBqoJdD3bqc4UPmkS5',
    description: 'Community (or council) mint used for this proposal',
  })
  @IsString()
  @IsSolanaPublicKey()
  governingTokenMint!: string;

  @ApiProperty({
    example: '79XMHFHXfCLwJcaQquUKswaN3Hze7HwQsHyFPViNpWiA',
    description: 'The wallet that signs and creates the proposal',
  })
  @IsString()
  @IsSolanaPublicKey()
  governanceAuthority!: string;

  @ApiProperty({
    example: '79XMHFHXfCLwJcaQquUKswaN3Hze7HwQsHyFPViNpWiA',
    description: 'Payer for rent/fees (often the same as governanceAuthority)',
  })
  @IsString()
  @IsSolanaPublicKey()
  payer!: string;

  @ApiPropertyOptional({
    example: '3t1c2mS6j1Yz9jvKc3b8LZ5Zs1nJwQ2M8b6tU3K9Px8A',
    description:
      'Optional seed for the Proposal PDA (let the SDK derive it if omitted)',
  })
  @IsOptional()
  @IsString()
  @IsSolanaPublicKey()
  proposalSeed?: string;

  @ApiPropertyOptional({
    example: '5Qh6vY1Yv3Y8o7V2y6X2q3n5u9P3s8N1m2K7x4J8d1L2',
    description:
      'Optional voter-weight plugin record PDA (NFT / custom weight plugins)',
  })
  @IsOptional()
  @IsString()
  @IsSolanaPublicKey()
  voterWeightRecord?: string;
}
