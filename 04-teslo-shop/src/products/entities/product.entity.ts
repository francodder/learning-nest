import { Entity, Column, PrimaryGeneratedColumn, BeforeInsert, BeforeUpdate, OneToMany } from "typeorm"; // It seems that this dependency is installed automatically
import { ProductImage } from ".";

@Entity({
  name: "products",
})
export class Product {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("text", {
    unique: true,
  })
  title: string;

  @Column("float", {
    default: 0,
  })
  price: number;

  @Column({
    type: "text",
    nullable: true,
  })
  description: string;

  @Column("text", {
    unique: true,
  })
  slug: string;

  @Column("int", {
    default: 0,
  })
  stock: number;

  @Column("text", {
    array: true,
  })
  sizes: string[];

  @Column("text")
  gender: string;

  @Column("text", {
    array: true,
    default: [],
  })
  tags: string[];

  /* Set this relation to be eager. Eager relations are always loaded automatically 
  when relation's owner entity is loaded using find* methods. Does not work with Query Builder */
  @OneToMany(() => ProductImage, productImage => productImage.product, { cascade: true, eager: true })
  images: ProductImage[];

  private parseSlug(base: string): string {
    return base.toLowerCase().replaceAll(" ", "_").replaceAll("'", "").replaceAll("-", "_");
  }

  /* Esto se ejecuta antes de cada insercion a la BD */
  @BeforeInsert()
  checkSlugInsert() {
    if (!this.slug) {
      this.slug = this.parseSlug(this.title);
    } else {
      this.slug = this.parseSlug(this.slug);
    }
  }

  @BeforeUpdate()
  checkSlugUpdate() {
    this.slug = this.parseSlug(this.slug);
  }
}
