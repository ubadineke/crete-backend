import { Server } from 'src/server/entities/server.entity';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Dao {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  name: string;

  @Column()
  publicKey: string;

  @OneToOne(() => Server, (server) => server.dao, { cascade: true })
  @JoinColumn()
  server: Server;

  // @ManyToOne(() => User, (user) => user.daos)
  // authority: User;
}
