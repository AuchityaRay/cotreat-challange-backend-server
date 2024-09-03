import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, CreateDateColumn } from 'typeorm';
import { User } from '../user/user.entity';

@Entity()
export class SharedImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  imageTitle: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @ManyToOne(() => User, (user) => user.sharedImages)
  user: User;
}
