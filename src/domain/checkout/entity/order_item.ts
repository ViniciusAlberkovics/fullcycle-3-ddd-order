type OrderItemProps = {
  name: string;
  price: number;
  productId: string;
  quantity: number;
};

export default class OrderItem {
  private _id: string;
  private _props: OrderItemProps;

  constructor(props: OrderItemProps, id: string) {
    this._id = id;
    this._props = props;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required.");
    }
    if (this._props.name.length === 0) {
      throw new Error("Name is required.");
    }
    if (this._props.price < 0) {
      throw new Error("Price must be greater than zero.");
    }
    if (this._props.quantity <= 0) {
      throw new Error("Quantity must be greater than zero.");
    }
  }

  total() {
    return this._props.price * this._props.quantity;
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

  get productId() {
    return this._props.productId;
  }

  get quantity() {
    return this._props.quantity;
  }
}
