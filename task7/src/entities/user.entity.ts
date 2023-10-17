import { Entity, PrimaryKey } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class User {
  @PrimaryKey()
  id: string = v4();

  constructor() {}
}
