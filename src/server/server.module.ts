import { Module } from '@nestjs/common';
import { ServerService } from './server.service';
import { ServerController } from './server.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ServerMember } from './entities/server-member.entity';
import { Server } from './entities/server.entity';
import { Dao } from '../daos/entities/dao.dto';
import { Channel } from '../channel/entities/channel.entity';
import { ChannelService } from 'src/channel/channel.service';
import { DaosService } from 'src/daos/daos.service';
import { SolanaService } from 'src/solana/solana.service';

@Module({
  imports: [TypeOrmModule.forFeature([ServerMember, Server, Dao, Channel])],
  controllers: [ServerController],
  providers: [SolanaService, ServerService, ChannelService, DaosService],
})
export class ServerModule {}
