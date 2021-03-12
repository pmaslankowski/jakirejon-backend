import { Address } from "../model/address";
import { Hospital } from "../model/hospital";

export const mapToAddress = hit => {
  const addressDoc = hit._source;
  const hospitalDoc = addressDoc.hospital;
  const hospital = new Hospital(hospitalDoc.name, hospitalDoc.address, hospitalDoc.phone);
  const apartments = mapApartments(addressDoc.apartments);
  return new Address(addressDoc.street, addressDoc.district, hospital, apartments);
}

const mapApartments = apartments => {
  if (apartments == null) {
    return null;
  } else {
    return apartments.map(x => x.toString());
  }
}