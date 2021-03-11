export class AddressNotFoundError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AddressNotFoundError';
    this.message = message;
  }
}

export class MissingApartmentNumberError extends Error {
  constructor(message) {
    super(message);
    this.name = 'MissingApartmentNumberError';
    this.message = message;
  }
}

export class AmbiguousAddressError extends Error {
  constructor(message) {
    super(message);
    this.name = 'AmbiguousAddressError';
    this.message = message;
  }
}

export class InvalidAddressError extends Error {
  constructor(message) {
    super(message);
    this.name = 'InvalidAddressError';
    this.message = message;
  }
}