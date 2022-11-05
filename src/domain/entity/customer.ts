import Address from "./address";

type CustomerProps = {
  name: string;
  address?: Address;
  active: boolean;
  rewardPoints?: number;
};

export default class Customer {
  private _id: string;
  private _props: CustomerProps;

  constructor(props: CustomerProps, id: string) {
    this._id = id;
    this._props = props;
    this.validate();
  }

  validate() {
    if (!this._props) {
      throw new Error("Name is required.");
    }
    if (this._props.name.length === 0) {
      throw new Error("Name is required.");
    }
    if (this._id.length === 0) {
      throw new Error("Id is required.");
    }
  }

  changeName(name: string) {
    this._props.name = name;
    this.validate();
  }

  changeAddress(address: Address) {
    this._props.address = address;
    this.validate();
  }

  activate() {
    if (!this._props.address) {
      throw new Error("Address is mandatory to activate a customer.");
    }

    this._props.active = true;
  }

  deactivate() {
    this._props.active = false;
  }

  isActive(): boolean {
    return this._props.active;
  }

  addRewardPoints(points: number) {
    this._props.rewardPoints = this.rewardPoints + points;
  }

  get id() {
    return this._id;
  }

  get name() {
    return this._props.name;
  }

  get address() {
    return this._props.address;
  }

  get rewardPoints() {
    return this._props.rewardPoints || 0;
  }
}
