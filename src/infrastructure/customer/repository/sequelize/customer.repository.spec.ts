import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/address";
import Customer from "../../../../domain/customer/entity/customer";
import SendConsoleLog1WhenCustomerIsCreatedHandler from "../../../../domain/customer/event/handler/send-console-log-1-when-customer-is-created.handler";
import SendConsoleLog2WhenCustomerIsCreatedHandler from "../../../../domain/customer/event/handler/send-console-log-2-when-customer-is-created.handler";
import SendConsoleLogWhenCustomerAddressIsChangedHandler from "../../../../domain/customer/event/handler/send-console-log-when-customer-address-changed.handler";
import CustomerModel from "./customer.model";
import CustomerRepository from "./customer.repository";

describe("Customer repository test", () => {
  let sqlz: Sequelize;

  beforeEach(async () => {
    sqlz = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sqlz.addModels([CustomerModel]);
    await sqlz.sync();
  });

  afterEach(async () => {
    await sqlz.close();
  });

  it("should create a customer", async () => {
    const customerRepository = new CustomerRepository();
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
      "1"
    );
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.id).toEqual(customer.id);
    expect(customerModel.name).toEqual(customer.name);
    expect(customerModel.active).toEqual(customer.isActive());
    expect(customerModel.rewardPoints).toEqual(customer.rewardPoints);
    expect(customerModel.street).toEqual(customer.address.street);
    expect(customerModel.zipCode).toEqual(customer.address.zipCode);
    expect(customerModel.district).toEqual(customer.address.district);
    expect(customerModel.streetNumber).toEqual(customer.address.number);
    expect(customerModel.state).toEqual(customer.address.state);
    expect(customerModel.city).toEqual(customer.address.city);
    expect(customerModel.complement).toEqual(null);
  });

  it("should update a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      {
        active: true,
        name: "my name",
        rewardPoints: 10,
        address: new Address(
          "02611-001",
          "Avenida Parada Pinto",
          "Vila Nova Cachoerinha",
          "123",
          "SP",
          "São Paulo"
        ),
      },
      "1"
    );
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.id).toEqual(customer.id);
    expect(customerModel.name).toEqual(customer.name);
    expect(customerModel.active).toEqual(customer.isActive());
    expect(customerModel.rewardPoints).toEqual(customer.rewardPoints);
    expect(customerModel.street).toEqual(customer.address.street);
    expect(customerModel.zipCode).toEqual(customer.address.zipCode);
    expect(customerModel.district).toEqual(customer.address.district);
    expect(customerModel.streetNumber).toEqual(customer.address.number);
    expect(customerModel.state).toEqual(customer.address.state);
    expect(customerModel.city).toEqual(customer.address.city);
    expect(customerModel.complement).toEqual(null);

    customer.changeName("Customer 1");
    customer.addRewardPoints(200);
    customer.changeAddress(
      new Address(
        "02611-001",
        "Avenida Parada Pinto",
        "Vila Nova Cachoerinha",
        "1234",
        "SP",
        "São Paulo"
      )
    );
    customer.deactivate();

    await customerRepository.update(customer);
    const customerModelUpdated = await CustomerModel.findOne({
      where: { id: "1" },
    });
    expect(customerModelUpdated.id).toEqual(customer.id);
    expect(customerModelUpdated.name).toEqual(customer.name);
    expect(customerModelUpdated.active).toEqual(customer.isActive());
    expect(customerModelUpdated.rewardPoints).toEqual(customer.rewardPoints);
    expect(customerModelUpdated.street).toEqual(customer.address.street);
    expect(customerModelUpdated.zipCode).toEqual(customer.address.zipCode);
    expect(customerModelUpdated.district).toEqual(customer.address.district);
    expect(customerModelUpdated.streetNumber).toEqual(customer.address.number);
    expect(customerModelUpdated.state).toEqual(customer.address.state);
    expect(customerModelUpdated.city).toEqual(customer.address.city);
    expect(customerModelUpdated.complement).toEqual(null);
  });

  it("should find a customer", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
      {
        active: true,
        name: "my name",
        rewardPoints: 10,
        address: new Address(
          "02611-001",
          "Avenida Parada Pinto",
          "Vila Nova Cachoerinha",
          "123",
          "SP",
          "São Paulo"
        ),
      },
      "1"
    );
    await customerRepository.create(customer);
    const customerModelFounded = await CustomerModel.findOne({
      where: { id: "1" },
    });

    const foundModel = await customerRepository.find("1");

    expect(foundModel.id).toEqual(customerModelFounded.id);
    expect(foundModel.name).toEqual(customerModelFounded.name);
    expect(foundModel.isActive()).toEqual(customerModelFounded.active);
    expect(foundModel.rewardPoints).toEqual(customerModelFounded.rewardPoints);
    expect(foundModel.address.street).toEqual(customerModelFounded.street);
    expect(foundModel.address.zipCode).toEqual(customerModelFounded.zipCode);
    expect(foundModel.address.district).toEqual(customerModelFounded.district);
    expect(foundModel.address.number).toEqual(
      customerModelFounded.streetNumber
    );
    expect(foundModel.address.state).toEqual(customerModelFounded.state);
    expect(foundModel.address.city).toEqual(customerModelFounded.city);
    expect(foundModel.address.complement).toEqual(null);
  });

  it("should throw an error when customer is not found", async () => {
    const customerRepository = new CustomerRepository();
    expect(async () => {
      await customerRepository.find("1ASDA");
    }).rejects.toThrow("Customer not found");
  });

  it("should find all customers", async () => {
    const customerRepository = new CustomerRepository();
    const customer1 = new Customer(
      {
        active: true,
        name: "customer 1",
        rewardPoints: 10,
        address: new Address(
          "02611-001",
          "Avenida Parada Pinto",
          "Vila Nova Cachoerinha",
          "123",
          "SP",
          "São Paulo"
        ),
      },
      "1"
    );
    await customerRepository.create(customer1);
    const customer2 = new Customer(
      {
        active: true,
        name: "customer 2",
        rewardPoints: 101,
        address: new Address(
          "02616-001",
          "Avenida Parada Pinto",
          "Vila Nova Cachoerinha",
          "345",
          "SP",
          "São Paulo"
        ),
      },
      "2"
    );
    await customerRepository.create(customer2);

    const customers = await customerRepository.findAll();

    expect(customers).toHaveLength(2);
  });

  it("should notify when customer is created", async () => {
    const eventHandler1 = new SendConsoleLog1WhenCustomerIsCreatedHandler();
    const eventHandler2 = new SendConsoleLog2WhenCustomerIsCreatedHandler();
    const customerRepository = new CustomerRepository();
    customerRepository.register("CustomerCreatedEvent", eventHandler1);
    customerRepository.register("CustomerCreatedEvent", eventHandler2);

    const eventHandler1Spy = jest.spyOn(eventHandler1, "handle");
    const eventHandler2Spy = jest.spyOn(eventHandler2, "handle");

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
      "1"
    );
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.id).toEqual(customer.id);
    expect(customerModel.name).toEqual(customer.name);
    expect(customerModel.active).toEqual(customer.isActive());
    expect(customerModel.rewardPoints).toEqual(customer.rewardPoints);
    expect(customerModel.street).toEqual(customer.address.street);
    expect(customerModel.zipCode).toEqual(customer.address.zipCode);
    expect(customerModel.district).toEqual(customer.address.district);
    expect(customerModel.streetNumber).toEqual(customer.address.number);
    expect(customerModel.state).toEqual(customer.address.state);
    expect(customerModel.city).toEqual(customer.address.city);
    expect(customerModel.complement).toEqual(null);
    expect(eventHandler1Spy).toHaveBeenCalled();
    expect(eventHandler2Spy).toHaveBeenCalled();
  });
  it("should notify when customer address is changed", async () => {
    const eventHandler =
      new SendConsoleLogWhenCustomerAddressIsChangedHandler();
    const customerRepository = new CustomerRepository();
    customerRepository.register("CustomerAddressChangedEvent", eventHandler);

    const eventHandlerSpy = jest.spyOn(eventHandler, "handle");

    const customer = new Customer(
      {
        active: true,
        name: "my name",
        rewardPoints: 10,
        address: new Address(
          "02611-001",
          "Avenida Parada Pinto",
          "Vila Nova Cachoerinha",
          "123",
          "SP",
          "São Paulo"
        ),
      },
      "1"
    );
    await customerRepository.create(customer);

    const customerModel = await CustomerModel.findOne({ where: { id: "1" } });

    expect(customerModel.id).toEqual(customer.id);
    expect(customerModel.name).toEqual(customer.name);
    expect(customerModel.active).toEqual(customer.isActive());
    expect(customerModel.rewardPoints).toEqual(customer.rewardPoints);
    expect(customerModel.street).toEqual(customer.address.street);
    expect(customerModel.zipCode).toEqual(customer.address.zipCode);
    expect(customerModel.district).toEqual(customer.address.district);
    expect(customerModel.streetNumber).toEqual(customer.address.number);
    expect(customerModel.state).toEqual(customer.address.state);
    expect(customerModel.city).toEqual(customer.address.city);
    expect(customerModel.complement).toEqual(null);

    customer.changeName("Customer 1");
    customer.addRewardPoints(200);
    customer.changeAddress(
      new Address(
        "02611-001",
        "Avenida Parada Pinto",
        "Vila Nova Cachoerinha",
        "1234",
        "SP",
        "São Paulo"
      )
    );
    customer.deactivate();

    await customerRepository.update(customer);
    const customerModelUpdated = await CustomerModel.findOne({
      where: { id: "1" },
    });
    expect(customerModelUpdated.id).toEqual(customer.id);
    expect(customerModelUpdated.name).toEqual(customer.name);
    expect(customerModelUpdated.active).toEqual(customer.isActive());
    expect(customerModelUpdated.rewardPoints).toEqual(customer.rewardPoints);
    expect(customerModelUpdated.street).toEqual(customer.address.street);
    expect(customerModelUpdated.zipCode).toEqual(customer.address.zipCode);
    expect(customerModelUpdated.district).toEqual(customer.address.district);
    expect(customerModelUpdated.streetNumber).toEqual(customer.address.number);
    expect(customerModelUpdated.state).toEqual(customer.address.state);
    expect(customerModelUpdated.city).toEqual(customer.address.city);
    expect(customerModelUpdated.complement).toEqual(null);
    expect(eventHandlerSpy).toHaveBeenCalled();
  });
});
