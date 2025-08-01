import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';
import { VerifyChallengeDTO } from './dto/verify-challenge.dto';
import * as nacl from 'tweetnacl';
import bs58 from 'bs58';
import { Keypair, PublicKey } from '@solana/web3.js';
import { UserService } from 'src/user/user.service';
import * as fs from 'fs';
import { homedir } from 'os';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    private readonly configService: ConfigService,
    private readonly userService: UserService,
  ) {}
  // create(createAuthDto: CreateAuthDto) {
  //   return 'This action adds a new auth';
  // }

  findAll() {
    return `This action returns all autimport { timestamp } from 'rxjs';h`;
  }

  findOne(id: number) {
    return `This action returns a #${id} auth`;
  }

  // update(id: number, updateAuthDto: UpdateAuthDto) {
  //   return `This action updates a #${id} auth`;
  // }

  remove(id: number) {
    return `This action removes a #${id} auth`;
  }

  async generateChallenge(walletAddress: string) {
    console.log('Entered the Generated Challenge Service');
    const challenge = {
      address: walletAddress,
      timestamp: Date.now(),
      nonce: crypto.randomUUID(),
    };
    const challengeJWT = await this.jwtService.signAsync(challenge, {
      secret: this.configService.get('JWT_SECRET'),
      expiresIn: '24h', //TODO: change to 5m in production
    });

    return { challengeJWT };
  }

  async verifyChallenge(dto: VerifyChallengeDTO) {
    try {
      const { walletAddress, challengeToken, signature } = dto;

      const challenge = await this.jwtService.verifyAsync(challengeToken, {
        secret: this.configService.get('JWT_SECRET'),
      });
      // console.log(challenge);
      const isValidSignature = this.verifySolanaSignature(
        walletAddress,
        challengeToken,
        signature,
      );
      console.log(isValidSignature);
      if (isValidSignature) {
        //Fetch existing user or create a new one.
        const user = await this.userService.findOrCreate(walletAddress);

        //sign access jwt
        const accessToken = await this.jwtService.signAsync(
          { walletAddress },
          {
            secret: this.configService.get('JWT_SECRET'),
            expiresIn: '24h',
          },
        );

        return { status: 'success', user, accessToken };
      } else {
        throw new UnauthorizedException('Invalid Signature, Connect again');
      }
    } catch (error) {
      console.error('Error verifying challenge:', error);
      throw new BadRequestException(
        'Challenge verification failed',
        error.message,
      );
    }
  }

  verifySolanaSignature(
    walletAddress: string,
    message: string,
    signature: string,
  ): boolean {
    try {
      const messageBytes = new TextEncoder().encode(message);
      console.log(message);
      const signatureBytes = bs58.decode(signature);
      // console.log(signature);
      const publicKey = new PublicKey(walletAddress);
      console.log(messageBytes);
      console.log(signatureBytes);
      console.log(publicKey.toBytes());
      return nacl.sign.detached.verify(
        messageBytes,
        signatureBytes,
        publicKey.toBytes(),
      );
    } catch (error) {
      console.error('Error verifying Solana Signature:', error);
      return false;
    }
  }

  //sign transaction/test only
  signChallengeJWTTx(jwt: string) {
    const kp = this.loadKeypair(process.env.KEYPAIR_PATH);
    const message = new TextEncoder().encode(jwt);
    console.log(jwt);
    // sign
    const signature = nacl.sign.detached(message, kp.secretKey);
    const encodedSig = bs58.encode(signature);

    console.log(message);
    console.log(signature);
    console.log(kp.publicKey.toBytes());
    // verify (optional, but nice to assert)
    const ok = nacl.sign.detached.verify(
      message,
      signature,
      kp.publicKey.toBytes(),
    );

    console.log(`ok: ${ok}`);

    return encodedSig;
  }

  loadKeypair(filePath?: string): Keypair {
    const path = filePath ?? `${homedir()}/.config/solana/id.json`; // default solana-keygen path
    const secretKey = Uint8Array.from(
      JSON.parse(fs.readFileSync(path, 'utf8')),
    );
    return Keypair.fromSecretKey(secretKey);
  }
}
