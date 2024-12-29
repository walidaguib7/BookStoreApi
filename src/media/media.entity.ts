import { User } from 'src/users/users.entity';
import { PrimaryGeneratedColumn, Column, Entity, OneToOne } from 'typeorm';

@Entity({ name: 'Media' })
export class Media {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  path: string;
  @OneToOne(() => User, (user) => user.file, { onDelete: 'SET NULL' })
  user: User;
}
