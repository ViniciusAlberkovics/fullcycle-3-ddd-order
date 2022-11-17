import Address from "./address";
import Customer from "./customer";

describe("Customer unit tests", () => {
  it("should throw error when id is empty", () => {
    expect(() => {
      new Customer(
        {
          active: true,
          name: "my name",
          address: null as never,
        },
        ""
      );
    }).toThrowError("Id is required.");
  });

  it("should throw error when name is empty", () => {
    expect(() => {
      new Customer(
        {
          active: true,
          name: "",
          address: null as never,
        },
        "123"
      );
    }).toThrowError("Name is required.");
  });

  it("should change name", () => {
    const customer = new Customer(
      {
        active: true,
        name: "my name",
        address: null as never,
      },
      "123"
    );
    customer.changeName("My new name");
    expect(customer.name).toBe("My new name");
  });

  it("should change address", () => {
    const customer = new Customer(
      {
        active: true,
        name: "my name",
        address: null as never,
      },
      "123"
    );
    customer.changeAddress(
      new Address(
        "02611-001",
        "Avenida Parada Pinto",
        "Vila Nova Cachoerinha",
        "123",
        "SP",
        "São Paulo"
      )
    );
    expect(customer.address).toBeDefined();
  });

  it("should activate customer", () => {
    const customer = new Customer(
      {
        active: true,
        name: "my name",
        address: new Address(
          "02611-001",
          "Avenida Parada Pinto",
          "Vila Nova Cachoerinha",
          "123",
          "SP",
          "São Paulo"
        ),
      },
      "123"
    );
    customer.activate();
    expect(customer.isActive()).toBe(true);
  });

  it("should deactivate customer", () => {
    const customer = new Customer(
      {
        active: true,
        name: "my name",
      },
      "123"
    );
    customer.deactivate();
    expect(customer.isActive()).toBe(false);
  });

  it("should throw error when address is undefined when you activate a customer", () => {
    const customer = new Customer(
      {
        active: true,
        name: "my name",
      },
      "123"
    );
    expect(() => customer.activate()).toThrowError(
      "Address is mandatory to activate a customer."
    );
  });

  it("should add reward points", () => {
    const customer = new Customer(
      {
        active: true,
        name: "customer 1",
      },
      "1"
    );
    expect(customer.rewardPoints).toBe(0);

    customer.addRewardPoints(15);
    expect(customer.rewardPoints).toBe(15);

    customer.addRewardPoints(150);
    expect(customer.rewardPoints).toBe(165);
  });
});
