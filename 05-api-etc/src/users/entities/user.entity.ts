import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column({
    type: "text",
  })
  firstName: string;

  @Column({
    type: "text",
  })
  lastName: string;

  @Column({
    type: "text",
    unique: true,
  })
  email: string;

  @Column({
    type: "text",
  })
  password: string;

  @Column({
    type: "text",
  })
  authState: string;

  @Column({
    type: "text",
  })
  state: string;

  @Column({
    type: "text",
  })
  rol: string;

  @Column({
    type: "timestamp",
  })
  createdAt: string;

  @Column({
    type: "timestamp",
    nullable: true,
    default: null,
  })
  suspendedAt: string;
}
