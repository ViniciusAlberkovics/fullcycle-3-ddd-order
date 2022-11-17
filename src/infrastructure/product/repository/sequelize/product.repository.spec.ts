import { Sequelize } from "sequelize-typescript";
import Product from "../../../../domain/product/entity/product";
import ProductModel from "./product.model";
import ProductRepository from "./product.repository";

describe("Product repository test", () => {
  let sqlz: Sequelize;

  beforeEach(async () => {
    sqlz = new Sequelize({
      dialect: "sqlite",
      storage: ":memory:",
      logging: false,
      sync: { force: true },
    });

    sqlz.addModels([ProductModel]);
    await sqlz.sync();
  });

  afterEach(async () => {
    await sqlz.close();
  });

  it("should create a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      {
        name: "test",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.id).toEqual("1");
    expect(productModel.name).toEqual("test");
    expect(productModel.price).toEqual(100);
  });

  it("should update a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      {
        name: "test",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product);

    const productModel = await ProductModel.findOne({ where: { id: "1" } });

    expect(productModel.id).toEqual("1");
    expect(productModel.name).toEqual("test");
    expect(productModel.price).toEqual(100);

    product.changeName("Product 1");
    product.changePrice(200);

    await productRepository.update(product);
    const productModelUpdated = await ProductModel.findOne({
      where: { id: "1" },
    });
    expect(productModelUpdated.id).toEqual("1");
    expect(productModelUpdated.name).toEqual("Product 1");
    expect(productModelUpdated.price).toEqual(200);
  });

  it("should find a product", async () => {
    const productRepository = new ProductRepository();
    const product = new Product(
      {
        name: "test",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product);
    const productModelCreated = await ProductModel.findOne({
      where: { id: "1" },
    });

    const foundModel = await productRepository.find("1");

    expect(foundModel.id).toEqual(productModelCreated.id);
    expect(foundModel.name).toEqual(productModelCreated.name);
    expect(foundModel.price).toEqual(productModelCreated.price);
  });

  it("should find all products", async () => {
    const productRepository = new ProductRepository();
    const product1 = new Product(
      {
        name: "product 1",
        price: 100,
      },
      "1"
    );
    await productRepository.create(product1);
    const product2 = new Product(
      {
        name: "product 2",
        price: 150,
      },
      "2"
    );
    await productRepository.create(product2);

    const foundProducts = await productRepository.findAll();
    const products = [product1, product2];

    expect(products).toEqual(foundProducts);
  });
});
