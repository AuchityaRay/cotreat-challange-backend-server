import { SharedImage } from 'src/shared-Images/sharedImage.entity';
import { Entity, Column, PrimaryGeneratedColumn, OneToMany, ManyToMany, JoinTable } from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ unique: true })
  username: string;

  @OneToMany(() => SharedImage, (sharedImage) => sharedImage.user)
  sharedImages: SharedImage[];

  @ManyToMany(() => SharedImage)
  @JoinTable({
    name: 'user_favorites', // Name of the join table
    joinColumn: { name: 'user_id', referencedColumnName: 'id' },
    inverseJoinColumn: { name: 'image_id', referencedColumnName: 'id' },
  })
  favorites: SharedImage[];

}
