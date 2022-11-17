import Product from "./product";

describe("Product unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Product(
        {
          name: "Product 1",
          price: 100,
        },
        ""
      );
    }).toThrowError("Id is required.");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Product(
        {
          name: "",
          price: 100,
        },
        "1"
      );
    }).toThrowError("Name is required.");
  });

  it("should throw error when price is less than zero", () => {
    expect(() => {
      new Product(
        {
          name: "Product 1",
          price: -1,
        },
        "1"
      );
    }).toThrowError("Price must be greater than zero.");
  });

  it("should change name", () => {
    const product = new Product(
      {
        name: "Product 1",
        price: 1,
      },
      "1"
    );
    product.changeName("Product 2");
    expect(product.name).toBe("Product 2");
  });

  it("should change price", () => {
    const product = new Product(
      {
        name: "Product 1",
        price: 1,
      },
      "1"
    );
    product.changePrice(100);
    expect(product.price).toBe(100);
  });
});
