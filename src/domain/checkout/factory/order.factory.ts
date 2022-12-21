import Order from "../entity/order";
import OrderItem from "../entity/order_item";

interface OrderFactoryProps {
  id: string;
  customerId: string;
  items: {
    id: string;
    productId: string;
    name: string;
    quantity: number;
    price: number;
  }[];
}

export default class OrderFactory {
  public static create(order: OrderFactoryProps): Order {
    return new Order(
      {
        customerId: order.customerId,
        items: order.items.map(
          (item) =>
            new OrderItem(
              {
                name: item.name,
                price: item.price,
                productId: item.productId,
                quantity: item.quantity,
              },
              item.id
            )
        ),
      },
      order.id
    );
  }
}
