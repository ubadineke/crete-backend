import { BadRequestException, Injectable } from '@nestjs/common';
import {
  PublicKey,
  Transaction,
  TransactionInstruction,
} from '@solana/web3.js';
import { SplGovernance } from 'governance-idl-sdk';
import { SolanaService } from 'src/solana/solana.service';
import { CreateDaoDTO } from './dto/create-dao.dto';
import { User } from 'src/user/entities/user.entity';
import { CreateProposalDTO } from './dto/create-proposal.dto';
import { VoteType, withCreateProposal } from '@realms-today/spl-governance';
import { Vote } from 'lucide-react';
@Injectable()
export class DaosService {
  private readonly splGovernance: SplGovernance;
  private readonly governanceProgramId: PublicKey;

  constructor(private readonly solanaService: SolanaService) {
    this.splGovernance = new SplGovernance(this.solanaService.connection);
    this.governanceProgramId = new PublicKey(
      'CgUkyVLN5fED4RNh9xUjj6seXT7fQHpkaqxBXm4gweg9',
    ); //change public key to original one afterwards
  }

  async fetchAllDaos() {
    return await this.splGovernance.getAllV1Realms();
  }

  async fetchDaoByPubkey(pubkey: string) {
    let key;
    try {
      key = new PublicKey(pubkey);
    } catch (error) {
      throw new BadRequestException('Not a Solana PublicKey');
    }

    return this.splGovernance.getRealmV1ByPubkey(key);
  }

  async createDao(dto: CreateDaoDTO, user: User) {
    try {
      const createDaoIx = await this.splGovernance.createRealmInstruction(
        dto.name,
        new PublicKey(dto.communityTokenMint),
        dto.minCommunityWeightToCreateGovernance,
        new PublicKey(user.walletAddress),
        dto.communityMintMaxVoterWeightSource,
        dto.councilTokenMint ? new PublicKey(dto.councilTokenMint) : undefined,
        dto.communityTokenType,
        dto.councilTokenType,
        dto.communityVoterWeightAddinProgramId
          ? new PublicKey(dto.communityVoterWeightAddinProgramId)
          : undefined,
        dto.maxCommunityVoterWeightAddinProgramId
          ? new PublicKey(dto.maxCommunityVoterWeightAddinProgramId)
          : undefined,
        dto.councilVoterWeightAddinProgramId
          ? new PublicKey(dto.councilVoterWeightAddinProgramId)
          : undefined,
        dto.maxCouncilVoterWeightAddinProgramId
          ? new PublicKey(dto.maxCouncilVoterWeightAddinProgramId)
          : undefined,
      );
      const tx = new Transaction().add(createDaoIx);
      tx.recentBlockhash = (
        await this.solanaService.connection.getLatestBlockhash()
      ).blockhash;
      tx.feePayer = new PublicKey(user.walletAddress);
      const serializedTx = tx.serialize({ requireAllSignatures: false });
      const base64Tx = serializedTx.toString('base64');

      return { serializedTx: base64Tx };
    } catch (error) {
      console.error('Error creating dao:', error);
      throw new BadRequestException('Error creating DAO');
    }
  }

  async createProposal(dto: CreateProposalDTO) {
    // const votee: VoteType = {
    //   choiceType: 'multi',
    //   multiChoiceOptions: null,
    // };
    // try {
    //   let instructions: TransactionInstruction[] = [];
    //   const proposal = await withCreateProposal(
    //     instructions,
    //     this.governanceProgramId,
    //     1,
    //     new PublicKey(dto.realmAccount),
    //     new PublicKey(dto.governanceAccount),
    //     new PublicKey(dto.tokenOwnerRecord),
    //     dto.name,
    //     dto.descriptionLink,
    //     new PublicKey(dto.governingTokenMint),
    //     new PublicKey(dto.governanceAuthority),
    //     undefined,
    //     new VoteType({
    //       type:
    //     }),
    //     dto.options,
    //     dto.useDenyOption,
    //     dto.payer,
    //     dto.proposalSeed,
    //   );
    // const proposalIx = await this.splGovernance.createProposalInstruction(
    //   dto.name,
    //   dto.descriptionLink,
    //   // VoteType.MULTI_CHOICE, //
    //   {
    //     choiceType: dto.voteType,
    //     multiChoiceOptions: null,
    //   },
    //   dto.options,
    //   dto.useDenyOption,
    //   dto.realmAccount,
    //   dto.governanceAccount,
    //   dto.tokenOwnerRecord,
    //   dto.governingTokenMint,
    //   dto.governanceAuthority,
    //   dto.payer,
    // );
  }
  catch(error) {}
  // }
  // create proposal
  // vote proposal
}
