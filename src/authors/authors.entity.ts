import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Authors {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column({ nullable: true })
  biography: string;
  @Column({ nullable: true })
  date_of_birth: Date;
}
