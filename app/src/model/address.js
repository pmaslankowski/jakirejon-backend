
export class Address {
  constructor(street, district, hospital, apartments) {
    this.street = street;
    this.district = district;
    this.hospital = hospital;
    this.apartments = apartments;
  }

  isSpecific() {
    return this.apartments !== null;
  }

  containsApartment(apartment) {
    return this.apartments === null || this.apartments.includes(apartment);
  }
}