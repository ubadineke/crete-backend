import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { DaosService } from './daos.service';
import { GetDaoDTO } from './dto/get-dao.dto';
import { CreateDaoDTO } from './dto/create-dao.dto';
import { CurrentUser } from '../user/user.decorator';
import { AuthGuard } from 'src/auth/guards/auth.guard';
import { ApiOperation } from '@nestjs/swagger';
import { CreateProposalDTO } from './dto/create-proposal.dto';

@Controller('daos')
export class DaosController {
  constructor(private readonly daosService: DaosService) {}

  @Post('/proposal')
  @ApiOperation({
    summary: 'Create a proposal',
    description: 'Create a proposal for a Realm',
  })
  createProposal(@Body() createProposalDto: CreateProposalDTO) {
    return this.daosService.createProposal(createProposalDto);
  }
  // @Get()
  // getAllDaos() {
  //   return this.daosService.fetchAllDaos();
  // }

  // @Get('/:pubkey')
  // getDaoInfo(@Param('pubkey') pubkey: string) {
  //   return this.daosService.fetchDaoByPubkey(pubkey);
  // }

  // @UseGuards(AuthGuard)
  // @Post()
  // createDao(@Body() createDaoDto: CreateDaoDTO, @CurrentUser() user) {
  //   return this.daosService.createDao(createDaoDto, user);
  // }
}
