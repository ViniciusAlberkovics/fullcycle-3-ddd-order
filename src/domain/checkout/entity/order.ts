import OrderItem from "./order_item";

type OrderProps = {
  customerId: string;
  items: OrderItem[];
};

export default class Order {
  private _id: string;
  private _props: OrderProps;

  constructor(props: OrderProps, id: string) {
    this._props = props;
    this._id = id;

    this.validate();
  }

  validate() {
    if (this._id.length === 0) {
      throw new Error("Id is required.");
    }
    if (!this._props) {
      throw new Error("Items is required.");
    }
    if (this._props.customerId.length === 0) {
      throw new Error("Customer Id is required.");
    }
    if (this._props.items.length === 0) {
      throw new Error("Items is required.");
    }
  }

  total(): number {
    return this._props.items.reduce((acc, item) => acc + item.total(), 0);
  }

  addItem(item: OrderItem): void {
    this._props.items.push(item);
  }

  get id() {
    return this._id;
  }

  get customerId() {
    return this._props.customerId;
  }

  get items() {
    return this._props.items;
  }
}
