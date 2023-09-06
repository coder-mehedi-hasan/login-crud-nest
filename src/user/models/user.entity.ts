import { Column, Entity, Index, PrimaryGeneratedColumn } from "typeorm";

@Entity('users')
@Index(["email"], { unique: true })
export class userEntity {
    @PrimaryGeneratedColumn()
    id: number;

    @Column({ nullable: false })
    name: string;

    @Column({ nullable: false })
    phone: number;

    @Column({ nullable: false })
    email: string;

    @Column({ nullable: false })
    password: string;

    @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' })
    createdAt: Date;

}