import { BadRequestException, Injectable } from '@nestjs/common';
import { PublicKey, Transaction } from '@solana/web3.js';
import { SplGovernance } from 'governance-idl-sdk';
import { SolanaService } from 'src/solana/solana.service';
import { CreateDaoDTO } from './dto/create-dao.dto';
import { User } from 'src/user/entities/user.entity';

@Injectable()
export class DaosService {
  private readonly splGovernance: SplGovernance;

  constructor(private readonly solanaService: SolanaService) {
    this.splGovernance = new SplGovernance(this.solanaService.connection);
  }

  async fetchAllDaos() {
    return await this.splGovernance.getAllRealms();
  }

  async fetchDaoByPubkey(pubkey: string) {
    try {
      new PublicKey(pubkey);
      return await this.splGovernance.getRealmV1ByPubkey(new PublicKey(pubkey));
    } catch (error) {
      throw new BadRequestException('Not a Solana PublicKey');
    }
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
}
