
import es from "../elasticsearch/addressDetails"
import {
  AddressNotFoundError,
  AmbiguousAddressError,
  MissingApartmentNumberError,
  InvalidAddressError
} from './errors';

export const getAddressDetails = async (address) => {
  const { street, apartment } = parseAddress(address);

  const addresses = await es.fetchAddressDetails(street);
  
  if (addresses.length === 1 && !addresses[0].isSpecific()) {
    return addresses[0];
  } else {
    return getAddressDetailsUsingApartment(apartment, addresses);
  }
}


const getAddressDetailsUsingApartment = (apartment, candidatingAddresses) => {
  if (apartment === undefined) {
    throw new MissingApartmentNumberError('An address has to contain an apartment number.');
  } 

  const matching = candidatingAddresses.filter(addr => addr.containsApartment(apartment));

  if (matching.length == 0) {
    throw new AddressNotFoundError(`Address not found.`);
  }
  if (matching.length > 1) {
    throw new AmbiguousAddressError('Address is ambiguous - it is assigned to multiple hospitals.');
  }
  
  return matching[0];
} 

const ADDR_REGEX = /^(.*?)(\s+(\d+.*))?$/;

const parseAddress = address => {
  const match = address.match(ADDR_REGEX);
  if (!match) {
    throw new InvalidAddressError('Invalid address.');
  }
  return { street: match[1], apartment: match[3] };
}