import Order from "../../domain/entity/order";
import OrderItem from "../../domain/entity/order_item";
import OrderRepositoryInterface from "../../domain/repository/order-repository.interface";
import OrderItemModel from "../db/sequelize/model/order-item.model";
import OrderModel from "../db/sequelize/model/order.model";

export default class OrderRepository implements OrderRepositoryInterface {
  async create(entity: Order): Promise<void> {
    await OrderModel.create(
      {
        id: entity.id,
        customerId: entity.customerId,
        total: entity.total(),
        items: entity.items.map((item) => ({
          id: item.id,
          name: item.name,
          price: item.price,
          productId: item.productId,
          quantity: item.quantity,
        })),
      },
      {
        include: [{ model: OrderItemModel }],
      }
    );
  }

  async update(entity: Order): Promise<void> {
    const transaction = await OrderModel.sequelize.transaction();
    try {
      await Promise.all(
        entity.items.map(async (item) => {
          await OrderItemModel.upsert(
            {
              id: item.id,
              name: item.name,
              price: item.price,
              productId: item.productId,
              quantity: item.quantity,
              orderId: entity.id,
            },
            {
              transaction: transaction,
            }
          );
        })
      );

      await OrderModel.update(
        {
          customerId: entity.customerId,
          total: entity.total(),
        },
        {
          where: {
            id: entity.id,
          },
          transaction: transaction,
        }
      );

      await transaction.commit();
    } catch (error) {
      await transaction.rollback();
      throw new Error("Error to update order");
    }
  }

  async find(id: string): Promise<Order> {
    const order = await OrderModel.findOne({
      where: {
        id: id,
      },
      include: [{ model: OrderItemModel }],
    });
    return new Order(
      {
        customerId: order.customerId,
        items: await Promise.all(
          order.items.map(
            async (item) =>
              new OrderItem(
                {
                  name: item.name,
                  price: item.price,
                  productId: item.productId,
                  quantity: item.quantity,
                },
                item.id
              )
          )
        ),
      },
      order.id
    );
  }

  async findAll(): Promise<Order[]> {
    const orders = await OrderModel.findAll({
      include: [{ model: OrderItemModel }],
    });
    return await Promise.all(
      orders.map(
        async (order) =>
          new Order(
            {
              customerId: order.customerId,
              items: await Promise.all(
                order.items.map(
                  async (item) =>
                    new OrderItem(
                      {
                        name: item.name,
                        price: item.price,
                        productId: item.productId,
                        quantity: item.quantity,
                      },
                      item.id
                    )
                )
              ),
            },
            order.id
          )
      )
    );
  }
}
