import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  UseGuards,
} from '@nestjs/common';
import { AuthService } from './auth.service';
import { ChallengeRequestDTO } from './dto/request-challenge.dto';
import { VerifyChallengeDTO } from './dto/verify-challenge.dto';
import { AuthGuard } from './auth.guard';

@Controller('auth')
@UsePipes()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.authService.findOne(+id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.authService.remove(+id);
  }

  @Post('/challenge')
  requestChallenge(@Body() requestChallengeDto: ChallengeRequestDTO) {
    return this.authService.generateChallenge(
      requestChallengeDto.walletAddress,
    );
  }

  @Post('/verify')
  verifyChallenge(@Body() verifyChallengeDto: VerifyChallengeDTO) {
    return this.authService.verifyChallenge(verifyChallengeDto);
  }
}
