import Order from "./order";
import OrderItem from "./order_item";

describe("Order unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Order(
        {
          customerId: "my name",
          items: [null as never],
        },
        ""
      );
    }).toThrowError("Id is required.");
  });

  it("should throw error when customerId is empty", () => {
    expect(() => {
      new Order(
        {
          customerId: "",
          items: [null as never],
        },
        "123"
      );
    }).toThrowError("Customer Id is required.");
  });

  it("should throw error when items is empty", () => {
    expect(() => {
      new Order(
        {
          customerId: "123",
          items: [],
        },
        "123"
      );
    }).toThrowError("Items is required.");
  });

  it("should calculate total", () => {
    const item1 = new OrderItem(
      {
        name: "Item 1",
        price: 11,
        productId: "p1",
        quantity: 2,
      },
      "1"
    );
    const item2 = new OrderItem(
      {
        name: "Item 2",
        price: 12,
        productId: "p2",
        quantity: 3,
      },
      "2"
    );
    const order = new Order(
      {
        customerId: "123",
        items: [item1, item2],
      },
      "123"
    );
    expect(order.total()).toBe(58);
  });

  it("should throw error when if the item quantity is greater than 0", () => {
    expect(() => {
      const item1 = new OrderItem(
        {
          name: "Item 1",
          price: 11,
          productId: "p1",
          quantity: 0,
        },
        "1"
      );
      new Order(
        {
          customerId: "123",
          items: [item1],
        },
        "123"
      );
    }).toThrowError("Quantity must be greater than zero.");
  });

  it("should add item in order", () => {
    const item1 = new OrderItem(
      {
        name: "Item 1",
        price: 11,
        productId: "p1",
        quantity: 2,
      },
      "1"
    );
    const item2 = new OrderItem(
      {
        name: "Item 2",
        price: 12,
        productId: "p2",
        quantity: 3,
      },
      "2"
    );
    const order = new Order(
      {
        customerId: "123",
        items: [item1, item2],
      },
      "123"
    );
    expect(order.total()).toBe(58);
    expect(order.items).toHaveLength(2);

    const item3 = new OrderItem(
      {
        name: "Item 3",
        price: 12,
        productId: "p3",
        quantity: 1,
      },
      "3"
    );

    order.addItem(item3);
    expect(order.total()).toBe(70);
    expect(order.items).toHaveLength(3);
  });
});
