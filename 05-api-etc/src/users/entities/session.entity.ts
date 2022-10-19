import { Entity, Column, JoinColumn, PrimaryGeneratedColumn, OneToOne } from "typeorm";

import { User } from "./user.entity";

@Entity()
export class Session {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @OneToOne(type => User)
  @JoinColumn()
  userId: string;

  @Column({
    type: "timestamp",
  })
  loggedAt: string;

  @Column({
    type: "text",
  })
  ipAddress: string;

  @Column({
    type: "text",
  })
  location: string;

  @Column({
    type: "text",
  })
  device: string;

  @Column({
    type: "text",
  })
  state: string;

  @Column({
    type: "timestamp",
    default: null,
  })
  loggedOutAt?: string;
}
