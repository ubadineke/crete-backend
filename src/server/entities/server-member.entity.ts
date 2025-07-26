import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  ManyToOne,
  PrimaryGeneratedColumn,
  Unique,
} from 'typeorm';
import { Server } from './server.entity';

@Entity()
@Unique(['user', 'server'])
export class ServerMember {
  @PrimaryGeneratedColumn()
  id: number;

  @ManyToOne(() => User, (user) => user.serverMemberships)
  user: User;

  @ManyToOne(() => Server, (server) => server.members)
  server: Server;

  @Column({ default: 'member' })
  role: 'creator' | 'admin' | 'mod' | 'member';

  @Column({ default: false })
  isBanned: boolean;

  @Column({ default: false })
  isMuted: boolean;

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
  joinedAt: Date;
}
