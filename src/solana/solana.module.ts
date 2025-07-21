import { Module } from '@nestjs/common';
import { clusterApiUrl, Connection } from '@solana/web3.js';
import { SolanaService } from './solana.service';

@Module({
  // providers: [
  //   {
  //     provide: 'SolanaService',
  //     useFactory: () => {
  //       return new Connection(clusterApiUrl('devnet'), 'confirmed');
  //     },
  //   },
  // ],
  // exports: ['SolanaService'],
  providers: [SolanaService],
})
export class SolanaModule {}
