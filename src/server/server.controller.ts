import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ServerService } from './server.service';
import { CreateServerDto } from './dto/create-server.dto';
import { UpdateServerDto } from './dto/update-server.dto';
import { CurrentUser } from 'src/user/user.decorator';
import { User } from 'src/user/entities/user.entity';
import { ApiOperation, ApiTags } from '@nestjs/swagger';
import { CreateProposalDTO } from 'src/daos/dto/create-proposal.dto';

@ApiTags('Server')
@Controller('server')
export class ServerController {
  constructor(private readonly serverService: ServerService) {}

  @Post()
  @ApiOperation({
    summary: 'Create a Server',
    description: 'create a server tied to a dao onchain',
  })
  create(@Body() createServerDto: CreateServerDto, @CurrentUser() user) {
    return this.serverService.create(createServerDto, user);
  }

  // @Get()
  // findAll() {
  //   return this.serverService.findAll();
  // }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.serverService.findOne(+id);
  // }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateServerDto: UpdateServerDto) {
  //   return this.serverService.update(+id, updateServerDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.serverService.remove(+id);
  // }
}
