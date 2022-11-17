import Customer from "../../customer/entity/customer";
import Order from "../entity/order";
import OrderItem from "../entity/order_item";
import OrderService from "./order.service";

describe("Order Service unit tests", () => {
  it("should place an order", () => {
    const customer = new Customer(
      {
        active: true,
        name: "customer 1",
      },
      "c1"
    );
    const item1 = new OrderItem(
      {
        name: "item 1",
        price: 10,
        productId: "p1",
        quantity: 1,
      },
      "i1"
    );

    const order = OrderService.placeOrder(customer, [item1]);
    expect(customer.rewardPoints).toBe(5);
    expect(order.total()).toBe(10);
  });

  it("should get total of all orders", () => {
    const item1 = new OrderItem(
      {
        name: "item 1",
        price: 100,
        productId: "p1",
        quantity: 1,
      },
      "i1"
    );
    const item2 = new OrderItem(
      {
        name: "item 2",
        price: 200,
        productId: "p2",
        quantity: 2,
      },
      "i2"
    );
    const item3 = new OrderItem(
      {
        name: "item 3",
        price: 10,
        productId: "p2",
        quantity: 2,
      },
      "i3"
    );

    const order1 = new Order(
      {
        customerId: "c1",
        items: [item1, item3],
      },
      "o1"
    );
    const order2 = new Order(
      {
        customerId: "c1",
        items: [item2],
      },
      "o2"
    );

    const total = OrderService.total([order1, order2]);

    expect(total).toBe(520);
  });
});
