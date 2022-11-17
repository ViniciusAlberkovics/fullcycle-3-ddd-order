import { Sequelize } from "sequelize-typescript";
import Address from "../../../../domain/customer/entity/address";
import Customer from "../../../../domain/customer/entity/customer";
import Order from "../../../../domain/checkout/entity/order";
import OrderItem from "../../../../domain/checkout/entity/order_item";
import Product from "../../../../domain/product/entity/product";
import CustomerModel from "../../../customer/repository/sequelize/customer.model";
import ProductModel from "../../../product/repository/sequelize/product.model";
import OrderRepository from "./order.repository";
import CustomerRepository from "../../../customer/repository/sequelize/customer.repository";
import ProductRepository from "../../../product/repository/sequelize/product.repository";
import OrderItemModel from "./order-item.model";
import OrderModel from "./order.model";

describe("Order repository test", () => {
  let sqlz: Sequelize;

  beforeEach(async () => {
    sqlz = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sqlz.addModels([OrderModel, OrderItemModel, ProductModel, CustomerModel]);
    await sqlz.sync();
  });

  afterEach(async () => {
    await sqlz.close();
  });

  it("should create a new order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
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
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(
      {
        name: "product 1",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product);

    const orderItem = new OrderItem(
      {
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 3,
      },
      "1"
    );

    const order = new Order(
      {
        customerId: customer.id,
        items: [orderItem],
      },
      "1"
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.id).toEqual(order.id);
    expect(orderModel.customerId).toEqual(customer.id);
    expect(orderModel.total).toEqual(order.total());
    expect(orderModel.items).toHaveLength(1);
    expect(orderModel.items[0]).toBeDefined();
    expect(orderModel.items[0].id).toEqual(orderItem.id);
    expect(orderModel.items[0].name).toEqual(orderItem.name);
    expect(orderModel.items[0].price).toEqual(orderItem.price);
    expect(orderModel.items[0].productId).toEqual(orderItem.productId);
    expect(orderModel.items[0].quantity).toEqual(orderItem.quantity);
    expect(orderModel.items[0].orderId).toEqual(order.id);
  });

  it("should update a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
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
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(
      {
        name: "product 1",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product);

    const orderItem = new OrderItem(
      {
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 3,
      },
      "1"
    );

    const order = new Order(
      {
        customerId: customer.id,
        items: [orderItem],
      },
      "1"
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderModel = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModel.id).toEqual(order.id);
    expect(orderModel.customerId).toEqual(customer.id);
    expect(orderModel.total).toEqual(order.total());
    expect(orderModel.items).toHaveLength(1);
    expect(orderModel.items[0]).toBeDefined();
    expect(orderModel.items[0].id).toEqual(orderItem.id);
    expect(orderModel.items[0].name).toEqual(orderItem.name);
    expect(orderModel.items[0].price).toEqual(orderItem.price);
    expect(orderModel.items[0].productId).toEqual(orderItem.productId);
    expect(orderModel.items[0].quantity).toEqual(orderItem.quantity);
    expect(orderModel.items[0].orderId).toEqual(order.id);

    const product2 = new Product(
      {
        name: "product 2",
        price: 200,
      },
      "2"
    );
    await productRepository.create(product2);

    const orderItem2 = new OrderItem(
      {
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,
      },
      "2"
    );
    order.addItem(orderItem2);
    await orderRepository.update(order);
    const orderModelUpdated = await OrderModel.findOne({
      where: { id: order.id },
      include: ["items"],
    });

    expect(orderModelUpdated.id).toEqual(order.id);
    expect(orderModelUpdated.customerId).toEqual(customer.id);
    expect(orderModelUpdated.total).toEqual(order.total());
    expect(orderModelUpdated.items).toHaveLength(2);
    expect(orderModelUpdated.items[0]).toBeDefined();
    expect(orderModelUpdated.items[0].id).toEqual(orderItem.id);
    expect(orderModelUpdated.items[0].name).toEqual(orderItem.name);
    expect(orderModelUpdated.items[0].price).toEqual(orderItem.price);
    expect(orderModelUpdated.items[0].productId).toEqual(orderItem.productId);
    expect(orderModelUpdated.items[0].quantity).toEqual(orderItem.quantity);
    expect(orderModelUpdated.items[0].orderId).toEqual(order.id);
    expect(orderModelUpdated.items[1]).toBeDefined();
    expect(orderModelUpdated.items[1].id).toEqual(orderItem2.id);
    expect(orderModelUpdated.items[1].name).toEqual(orderItem2.name);
    expect(orderModelUpdated.items[1].price).toEqual(orderItem2.price);
    expect(orderModelUpdated.items[1].productId).toEqual(orderItem2.productId);
    expect(orderModelUpdated.items[1].quantity).toEqual(orderItem2.quantity);
    expect(orderModelUpdated.items[1].orderId).toEqual(order.id);
  });

  it("should find a order", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
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
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(
      {
        name: "product 1",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product);

    const orderItem = new OrderItem(
      {
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 3,
      },
      "1"
    );

    const order = new Order(
      {
        customerId: customer.id,
        items: [orderItem],
      },
      "1"
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderFounded = await orderRepository.find(order.id);

    expect(orderFounded.id).toEqual(order.id);
    expect(orderFounded.customerId).toEqual(customer.id);
    expect(orderFounded.total()).toEqual(order.total());
    expect(orderFounded.items).toHaveLength(1);
    expect(orderFounded.items[0]).toBeDefined();
    expect(orderFounded.items[0].id).toEqual(orderItem.id);
    expect(orderFounded.items[0].name).toEqual(orderItem.name);
    expect(orderFounded.items[0].price).toEqual(orderItem.price);
    expect(orderFounded.items[0].productId).toEqual(orderItem.productId);
    expect(orderFounded.items[0].quantity).toEqual(orderItem.quantity);
  });

  it("should find all orders", async () => {
    const customerRepository = new CustomerRepository();
    const customer = new Customer(
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
    await customerRepository.create(customer);

    const productRepository = new ProductRepository();
    const product = new Product(
      {
        name: "product 1",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product);

    const orderItem = new OrderItem(
      {
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 3,
      },
      "1"
    );

    const order = new Order(
      {
        customerId: customer.id,
        items: [orderItem],
      },
      "1"
    );

    const orderRepository = new OrderRepository();
    await orderRepository.create(order);

    const orderItem2 = new OrderItem(
      {
        name: product.name,
        price: product.price,
        productId: product.id,
        quantity: 1,
      },
      "2"
    );

    const order2 = new Order(
      {
        customerId: customer.id,
        items: [orderItem2],
      },
      "2"
    );
    await orderRepository.create(order2);

    const ordersFounded = await orderRepository.findAll();

    expect(ordersFounded).toHaveLength(2);
  });
});
