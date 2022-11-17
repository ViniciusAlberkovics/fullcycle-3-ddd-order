import EventDispatcher from "../../../../domain/@shared/event/event-dispatcher";
import Address from "../../../../domain/customer/entity/address";
import Customer from "../../../../domain/customer/entity/customer";
import CustomerAddressChangedEvent from "../../../../domain/customer/event/customer-address-changed.event";
import CustomerCreatedEvent from "../../../../domain/customer/event/customer-created.event";
import CustomerRepositoryInterface from "../../../../domain/customer/repository/customer-repository.interface";
import CustomerModel from "./customer.model";

export default class CustomerRepository
  extends EventDispatcher
  implements CustomerRepositoryInterface
{
  constructor() {
    super();
  }

  async create(entity: Customer): Promise<void> {
    await CustomerModel.create({
      id: entity.id,
      name: entity.name,
      active: entity.isActive(),
      rewardPoints: entity.rewardPoints,
      street: entity.address.street,
      zipCode: entity.address.zipCode,
      district: entity.address.district,
      streetNumber: entity.address.number,
      state: entity.address.state,
      city: entity.address.city,
      complement: entity.address.complement,
    });
    this.notify(new CustomerCreatedEvent(entity));
  }

  async update(entity: Customer): Promise<void> {
    await CustomerModel.update(
      {
        name: entity.name,
        active: entity.isActive(),
        rewardPoints: entity.rewardPoints,
        street: entity.address.street,
        zipCode: entity.address.zipCode,
        district: entity.address.district,
        streetNumber: entity.address.number,
        state: entity.address.state,
        city: entity.address.city,
        complement: entity.address.complement,
      },
      {
        where: {
          id: entity.id,
        },
      }
    );
    this.notify(new CustomerAddressChangedEvent(entity));
  }

  async find(id: string): Promise<Customer> {
    try {
      const customerModel = await CustomerModel.findOne({
        where: { id: id },
        rejectOnEmpty: true,
      });

      return new Customer(
        {
          name: customerModel.name,
          active: customerModel.active,
          rewardPoints: customerModel.rewardPoints,
          address: new Address(
            customerModel.zipCode,
            customerModel.street,
            customerModel.district,
            customerModel.streetNumber,
            customerModel.state,
            customerModel.city,
            customerModel.complement
          ),
        },
        customerModel.id
      );
    } catch (error) {
      throw new Error("Customer not found");
    }
  }

  async findAll(): Promise<Customer[]> {
    const customerModels = await CustomerModel.findAll();
    return await Promise.all(
      customerModels.map(
        async (customerModel) =>
          new Customer(
            {
              name: customerModel.name,
              active: customerModel.active,
              rewardPoints: customerModel.rewardPoints,
              address: new Address(
                customerModel.zipCode,
                customerModel.street,
                customerModel.district,
                customerModel.streetNumber,
                customerModel.state,
                customerModel.city,
                customerModel.complement
              ),
            },
            customerModel.id
          )
      )
    );
  }
}
