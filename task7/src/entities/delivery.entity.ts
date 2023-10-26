import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class Delivery {
  @PrimaryKey()
  id: string = v4();

  @Property()
  type: TDelivery;

  @Property()
  address?: string;

  constructor(type: TDelivery, address: string | undefined = undefined) {
    this.type = type;
    this.address = address;
  }
}

enum TDelivery {
    "POST" = "POST",
    "COURIER" = "COURIER",
  }
  