import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("specifications")
class Specification {
  @PrimaryGeneratedColumn("uuid")
  id?: string;

  @Column("varchar")
  name: string;

  @Column("varchar")
  description: string;

  @CreateDateColumn()
  created_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Specification };
