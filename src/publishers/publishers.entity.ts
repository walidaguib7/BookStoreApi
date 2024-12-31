import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Publisher {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  adresse: string;
  @Column()
  email: string;
  @Column()
  phone_number: string;
}
