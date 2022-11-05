import Address from "../../domain/entity/address";
import Customer from "../../domain/entity/customer";
import CustomerRepositoryInterface from "../../domain/repository/customer-repository.interface";
import CustomerModel from "../db/sequelize/model/customer.model";

export default class CustomerRepository implements CustomerRepositoryInterface {
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
