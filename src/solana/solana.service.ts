import { Injectable } from '@nestjs/common';
import { clusterApiUrl, Connection } from '@solana/web3.js';

@Injectable()
export class SolanaService {
  readonly connection: Connection;
  constructor() {
    this.connection = new Connection(clusterApiUrl('devnet'), 'confirmed');
  }
}
