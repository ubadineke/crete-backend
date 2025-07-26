import { Dao } from 'src/daos/entities/dao.dto';
import { ServerMember } from 'src/server/entities/server-member.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  username?: string;

  @Column({ unique: true })
  walletAddress: string;

  @OneToMany(() => ServerMember, (membership) => membership.user)
  serverMemberships: ServerMember[];

  // @OneToMany(() => Dao, (dao) => dao.publicKey)
  // daos: Dao[];
}
