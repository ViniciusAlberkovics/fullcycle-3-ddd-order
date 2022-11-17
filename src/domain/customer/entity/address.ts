export default class Address {
  private _zipCode: string;
  private _street: string;
  private _district: string;
  private _number: string;
  private _complement?: string;
  private _city: string;
  private _state: string;

  constructor(
    zipCode: string,
    street: string,
    district: string,
    number: string,
    state: string,
    city: string,
    complement?: string
  ) {
    this._zipCode = zipCode;
    this._street = street;
    this._district = district;
    this._number = number;
    this._complement = complement;
    this._city = city;
    this._state = state;

    this.validate();
  }

  validate() {
    if (this._zipCode.length === 0) {
      throw new Error("ZipCode is required.");
    }
    if (this._street.length === 0) {
      throw new Error("Street is required.");
    }
    if (this._district.length === 0) {
      throw new Error("District is required.");
    }
    if (this._number.length === 0) {
      throw new Error("Number is required.");
    }
    if (this._city.length === 0) {
      throw new Error("City is required.");
    }
    if (this._state.length === 0) {
      throw new Error("State is required.");
    }
  }

  toString() {
    return `${this._street}, ${this._district}, ${this._number}, ${this._zipCode}, ${this._city} - ${this._state}`;
  }

  get zipCode() {
    return this._zipCode;
  }

  get street() {
    return this._street;
  }

  get district() {
    return this._district;
  }

  get number() {
    return this._number;
  }

  get state() {
    return this._state;
  }

  get city() {
    return this._city;
  }

  get complement() {
    return this._complement;
  }
}
