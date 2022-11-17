type ProductProps = {
  price: number;
  name: string;
};

export default class Product {
  private _id: string;
  private _props: ProductProps;

  constructor(props: ProductProps, id: string) {
    this._props = props;
    this._id = id;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required.");
    }
    if (!this._props) {
      throw new Error("Name is required.");
    }
    if (this._props.name.length === 0) {
      throw new Error("Name is required.");
    }
    if (this._props.price < 0) {
      throw new Error("Price must be greater than zero.");
    }
  }

  changeName(name: string) {
    this._props.name = name;
    this.validate();
  }

  changePrice(price: number) {
    this._props.price = price;
    this.validate();
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._props.name;
  }

  get price() {
    return this._props.price;
  }
}
