import { Address } from "../model/address";
import { Hospital } from "../model/hospital";

export const mapToAddress = hit => {
  const addressDoc = hit._source;
  const hospitalDoc = addressDoc.hospital;
  const hospital = new Hospital(hospitalDoc.name, hospitalDoc.address, hospitalDoc.phone);
  return new Address(addressDoc.street, addressDoc.district, hospital, addressDoc.apartments);
}