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
import { AuthGuard } from './guards/auth.guard';
import { ApiBearerAuth, ApiOperation, ApiResponse } from '@nestjs/swagger';
import { TestSignChallengeDTO } from './dto/test-sign-challenge.dto';

@Controller('auth')
@UsePipes()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @UseGuards(AuthGuard)
  @ApiBearerAuth()
  @Get()
  findAll() {
    return this.authService.findAll();
  }

  // @Get(':id')
  // findOne(@Param('id') id: string) {
  //   return this.authService.findOne(+id);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.authService.remove(+id);
  // }

  @ApiOperation({
    summary: 'first auth step',
    description:
      'Start authentication with this endpoint, returns a JWT that should be signed by the wallet',
  })
  @Post('/challenge')
  requestChallenge(@Body() requestChallengeDto: ChallengeRequestDTO) {
    return this.authService.generateChallenge(
      requestChallengeDto.walletAddress,
    );
  }

  @ApiOperation({
    summary: 'verify first auth(signature)',
    description: 'Verifies signature of the JWT from the first authentication',
  })
  @ApiResponse({
    status: 200,
    description: 'User signed in successfully',
    type: 'user object',
  })
  @Post('/verify')
  verifyChallenge(@Body() verifyChallengeDto: VerifyChallengeDTO) {
    return this.authService.verifyChallenge(verifyChallengeDto);
  }

  @ApiOperation({
    summary: 'sign jwt(test only not production)',
    description:
      'Sign JWT and return signature, to be verified with /auth/verify ',
  })
  @Post('/test-sign')
  signTx(@Body() dto: TestSignChallengeDTO) {
    // console.log(dto.jwt);
    return this.authService.signChallengeJWTTx(dto.jwt);
  }
}
