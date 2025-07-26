import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Server } from './entities/server.entity';
import { Repository } from 'typeorm';
import { Dao } from 'src/daos/entities/dao.dto';
import { Channel } from 'src/channel/entities/channel.entity';
import { User } from 'src/user/entities/user.entity';
import { ChannelService } from 'src/channel/channel.service';
import { ServerMember } from './entities/server-member.entity';
import { DaosService } from 'src/daos/daos.service';

@Injectable()
export class ServerService {
  constructor(
    @InjectRepository(Server)
    private serverRepository: Repository<Server>,
    @InjectRepository(Dao)
    private daoRepository: Repository<Dao>,
    @InjectRepository(ServerMember)
    private serverMemberRepository: Repository<ServerMember>,
    private channelService: ChannelService,
    private daoService: DaosService,
  ) {}
  async create(dto: CreateServerDto, user: User) {
    try {
      const { name, daoPubkey } = dto;

      //Check if server exists already tied to that dao
      const serverCheck = await this.serverRepository.findOne({
        where: { dao: daoPubkey },
      });

      if (serverCheck) {
        throw new BadRequestException('Server already exists');
      }

      //If no server,
      //Check if the dao exists onchain
      const dao = await this.daoService.fetchDaoByPubkey(daoPubkey);
      // return;

      if (!dao) {
        throw new Error("Dao doesn't exist");
      }

      //Check if server already exists
      const server = await this.serverRepository.create({
        name,
        dao: daoPubkey,
      });

      const generalChannel = await this.channelService.create(
        'general',
        server,
      );
      const membership = await this.serverMemberRepository.create({
        user,
        server,
        role: 'creator',
      });
      await server.channels.push(generalChannel);
      await server.members.push(membership);
      const saved = await this.serverRepository.save(server);

      return this.serverRepository.findOne({
        where: { id: saved.id },
        relations: ['members', 'channels'],
      });
    } catch (error) {
      console.error('Error creating Server', error);
      if (error.message == "The account doesn't exist.") {
        error.message = 'This Dao Publickey(DAO) does not exist onchain';
      }
      throw new BadRequestException(error.message);
    }
  }

  findAll() {
    return this.serverRepository.find();
    return `This action returns all server`;
  }

  findOne(id: number) {
    return `This action returns a #${id} server`;
  }

  update(id: number, updateServerDto: UpdateServerDto) {
    return `This action updates a #${id} server`;
  }

  remove(id: number) {
    return `This action removes a #${id} server`;
  }
}
