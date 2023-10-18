import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from "typeorm";
import { v4 as uuidV4 } from "uuid";

@Entity("rentals")
class Rental {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column("uuid")
  car_id: string;

  @Column("uuid")
  user_id: string;

  @Column("timestamp")
  start_date: Date;

  @Column("timestamp")
  end_date: Date;

  @Column("timestamp")
  expected_return_date: Date;

  @Column("numeric")
  total: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;

  constructor() {
    if (!this.id) {
      this.id = uuidV4();
    }
  }
}

export { Rental };