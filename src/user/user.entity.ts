import { SharedImage } from 'src/shared-Images/sharedImage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => SharedImage, (sharedImage) => sharedImage.user)
  sharedImages: SharedImage[];
}
