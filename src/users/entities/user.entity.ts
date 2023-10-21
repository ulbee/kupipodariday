import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  @Column({
    type: 'varchar',
    length: 30,
  })
  username: string;

  @Column()
  about: string;

  @Column()
  avatar: string;

  @Column()
  email: string;

  @Column()
  password: string;

  @Column()
  wishes: string;

  @Column()
  offers: string;

  @Column()
  wishlists: string;
}
