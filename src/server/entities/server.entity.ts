import { Channel } from 'src/channel/entities/channel.entity';
import { Dao } from 'src/daos/entities/dao.dto';
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  ManyToMany,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
  Entity,
  Unique,
} from 'typeorm';
import { ServerMember } from './server-member.entity';

@Entity()
@Unique(['dao'])
export class Server {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  // @OneToOne(() => Dao, (dao) => dao.server)
  // dao: Dao;
  @Column()
  dao: string;

  @OneToMany(() => Channel, (channel) => channel.server, { cascade: true })
  channels: Channel[];

  //dao
  @ManyToMany(() => ServerMember, (membership) => membership.server, {
    cascade: true,
  })
  members: ServerMember[];
}
