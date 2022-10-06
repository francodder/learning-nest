import { Entity, Column, PrimaryGeneratedColumn } from "typeorm"; // It seems that this dependency is installed automatically

@Entity()
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", {
    unique: true,
  })
  title: string;
}
