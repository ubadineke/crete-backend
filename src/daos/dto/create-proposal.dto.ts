import {
  IsBoolean,
  IsNotEmpty,
  IsOptional,
  IsString,
  IsArray,
  IsNumber,
  ValidateNested,
  IsIn,
} from 'class-validator';
import { Type } from 'class-transformer';

class MultiChoiceOptionsDTO {
  @IsIn(['fullWeight', 'weighted'])
  choiceType: 'fullWeight' | 'weighted';

  @IsNumber()
  minVoterOptions: number;

  @IsNumber()
  maxVoterOptions: number;

  @IsNumber()
  maxWinningOptions: number;
}

class VoteTypeDTO {
  @IsIn(['single', 'multi'])
  choiceType: 'single' | 'multi';

  @ValidateNested()
  @Type(() => MultiChoiceOptionsDTO)
  @IsOptional()
  multiChoiceOptions?: MultiChoiceOptionsDTO | null;
}

export class CreateProposalDTO {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  @IsNotEmpty()
  descriptionLink: string;

  @ValidateNested()
  @Type(() => VoteTypeDTO)
  voteType: VoteTypeDTO;

  @IsArray()
  @IsString({ each: true })
  options: string[];

  @IsBoolean()
  useDenyOption: boolean;

  @IsString()
  realmAccount: string;

  @IsString()
  governanceAccount: string;

  @IsString()
  tokenOwnerRecord: string;

  @IsString()
  governingTokenMint: string;

  @IsString()
  governanceAuthority: string;

  @IsString()
  payer: string;

  @IsOptional()
  @IsString()
  proposalSeed?: string;

  @IsOptional()
  @IsString()
  voterWeightRecord?: string;
}
