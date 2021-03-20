import asyncHandler from 'express-async-handler';
import capitalize from 'capitalize';

import { getAddressDetails } from './../services/addressDetailsService';

export const handleGetAddressDetails = asyncHandler(async (req, res, next) => {
  const address = req.query.address;
  if (!address) {
    res.status(400)
      .send({ message: "Request parameter: 'address' is required" });
  }
  
  try {
    const details = await getAddressDetails(address);
    res.send({
      address: capitalize(address, true),
      hospital: details.hospital
    });
  } catch (e) {
    if (e.name === 'AddressNotFoundError') {
      return res.status(404)
        .send({ message: 'Nie znaleziono podanego adresu.'});
    } else if (e.name === 'AmbiguousAddressError') {
      // TODO: log it somewhere
      res.status(500)
        .send({ message: 'Podany adres jest przypisany do więcej niż jednego szpitala.'});
    } else if (e.name === 'MissingApartmentNumberError') {
      res.status(422)
        .send({ message: 'Aby znaleźć szpital przypisany do podanego adresu, należy doprecyzować numer domu.'});
    }
  }
});