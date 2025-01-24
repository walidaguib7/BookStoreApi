import { Media } from 'src/media/media.entity';
import { Payments } from 'src/payments/payments.entity';
import { Review } from 'src/reviews/review.entity';
import { WishLists } from 'src/wishlists/wishlists.entity';
import {
  Column,
  Entity,
  JoinColumn,
  OneToMany,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'User' })
export class User {
  @PrimaryGeneratedColumn()
  userId: number;
  @Column()
  firstname: string;
  @Column()
  lastname: string;
  @Column({ unique: true })
  username: string;
  @Column({ unique: true })
  email: string;
  @Column()
  passwordHash: string;
  @Column({ default: false })
  isVerified: boolean;
  @Column('text', { array: true })
  roles: string[];
  @OneToOne(() => Media, (media) => media.user, {
    nullable: true,
    onDelete: 'SET NULL',
  })
  @JoinColumn()
  file: Media;
  @OneToMany(() => Review, (review) => review.user, { onDelete: 'CASCADE' })
  reviews: Review[];

  @OneToMany(() => WishLists, (ws) => ws.user)
  wishlists: WishLists[];
  @OneToMany(() => Payments, (payment) => payment.user)
  payments: Payments[];
}
