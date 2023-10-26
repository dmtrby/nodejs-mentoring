import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { v4 } from "uuid";

@Entity()
export class Payment {
  @PrimaryKey()
  id: string = v4();

  @Property()
  type!: TPayment;

  @Property()
  address?: string;

  @Property()
  creditCard?: string;

  constructor(
    type: TPayment,
    address: string | undefined = undefined,
    creditCard: string | undefined = undefined
  ) {
    this.type = type;
    this.address = address;
    this.creditCard = creditCard;
  }
}

enum TPayment {
  "PAYPAL" = "PAYPAL",
  "REVOLUT" = "REVOLUT",
}
