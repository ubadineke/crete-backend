import { Module } from '@nestjs/common';
import { DaosService } from './daos.service';
import { DaosController } from './daos.controller';
import { SolanaService } from 'src/solana/solana.service';
import { JwtService } from '@nestjs/jwt';
import { UserService } from 'src/user/user.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';

@Module({
  imports: [TypeOrmModule.forFeature([User])],
  controllers: [DaosController],
  providers: [JwtService, UserService, SolanaService, DaosService],
})
export class DaosModule {}
