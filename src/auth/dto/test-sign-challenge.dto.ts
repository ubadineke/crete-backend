import { IsJWT, IsNotEmpty, IsString } from 'class-validator';

export class TestSignChallengeDTO {
  @IsNotEmpty()
  @IsString()
  @IsJWT()
  jwt: string;
}
