import CustomerFactory from "./customer.factory";

describe("Customer factory unit test", () => {
  it("should create a customer", () => {
    const customer = CustomerFactory.create("Vinicius");

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Vinicius");
    expect(customer.address).toBeUndefined();
  });

  it("should create a customer with an address", () => {
    const customer = CustomerFactory.createWithAddress(
      "Vinicius",
      "02611-001",
      "Avenida Parada Pinto",
      "Vila Nova Cachoerinha",
      "123",
      "SP",
      "São Paulo"
    );

    expect(customer.id).toBeDefined();
    expect(customer.name).toBe("Vinicius");
    expect(customer.address).toBeDefined();
    expect(customer.address.zipCode).toBe("02611-001");
    expect(customer.address.street).toBe("Avenida Parada Pinto");
    expect(customer.address.district).toBe("Vila Nova Cachoerinha");
    expect(customer.address.number).toBe("123");
    expect(customer.address.state).toBe("SP");
    expect(customer.address.city).toBe("São Paulo");
  });
});
