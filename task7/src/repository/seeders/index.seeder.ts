import { Dictionary, EntityManager } from "@mikro-orm/core";
import { Seeder } from "@mikro-orm/seeder";
import { ProductFactory } from "./factories/product.factory";
import { User } from "../../entities/user.entity";
import { Cart } from "../../entities/cart.entity";
import { CartItem } from "../../entities/cartItem.entity";

export class UserSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.user1 = em.create(User, {});
    context.user2 = em.create(User, {});
    context.user3 = em.create(User, {});
    em.create(User, {});
  }
}

export class ProductSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    new ProductFactory(em)
      .make(10)
      .map((product, index) => (context[`product${index}`] = product));
  }
}

export class CartSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    context.cart1 = em.create(Cart, { user: context.user1, isDeleted: false });
    context.cart2 = em.create(Cart, { user: context.user2, isDeleted: false });
    context.cart3 = em.create(Cart, { user: context.user3, isDeleted: false });
    context.cart4 = em.create(Cart, { user: context.user1, isDeleted: true });
  }
}

export class CartItemSeeder extends Seeder {
  async run(em: EntityManager, context: Dictionary): Promise<void> {
    em.create(CartItem, {
      cart: context.cart1,
      product: context.product1,
      count: 2,
    });
    em.create(CartItem, {
      cart: context.cart1,
      product: context.product2,
      count: 1,
    });
    em.create(CartItem, {
      cart: context.cart1,
      product: context.product4,
      count: 5,
    });
    em.create(CartItem, {
      cart: context.cart2,
      product: context.product6,
      count: 1,
    });
    em.create(CartItem, {
      cart: context.cart3,
      product: context.product7,
      count: 1,
    });
    em.create(CartItem, {
      cart: context.cart1,
      product: context.product8,
      count: 3,
    });
    em.create(CartItem, {
      cart: context.cart4,
      product: context.product8,
      count: 3,
    });
  }
}

export class DatabaseSeeder extends Seeder {
  run(em: EntityManager): Promise<void> {
    return this.call(em, [
      UserSeeder,
      ProductSeeder,
      CartSeeder,
      CartItemSeeder,
    ]);
  }
}
