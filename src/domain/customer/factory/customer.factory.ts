import Customer from "../entity/customer";
import { v4 as uuid } from "uuid";
import Address from "../entity/address";

export default class CustomerFactory {
  public static create(name: string): Customer {
    return new Customer(
      {
        active: true,
        name: name,
      },
      uuid()
    );
  }

  public static createWithAddress(
    name: string,
    zipCode: string,
    street: string,
    district: string,
    number: string,
    state: string,
    city: string,
    complement?: string
  ): Customer {
    return new Customer(
      {
        active: true,
        name: name,
        address: new Address(
          zipCode,
          street,
          district,
          number,
          state,
          city,
          complement
        ),
      },
      uuid()
    );
  }
}
