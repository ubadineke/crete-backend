import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class CreateServerDto {
  @ApiProperty({
    description: 'Server name',
    example: 'Metaplex DAO',
  })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({
    description: 'DAO public key',
    example: 'Bf8PxxWt7UTvNGcrDyNwQiERSwNroa4pEo1pxwKo17Uh',
  })
  @IsNotEmpty()
  @IsString()
  daoPubkey: string;
}
