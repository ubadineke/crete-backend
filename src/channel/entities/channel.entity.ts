import { Server } from 'src/server/entities/server.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Channel {
  @PrimaryGeneratedColumn('uuid')
  id: number;

  @Column()
  name: string;

  @ManyToOne(() => Server, (server) => server.channels)
  server: Server;

  // You can add permissions here later if needed
}
