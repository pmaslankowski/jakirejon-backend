const { Address } = require("../model/address");
const { Hospital } = require("../model/hospital");
const { mapToAddress } = require("./mapper");

describe('mapToAddress', () => {
  it('should map es document to Address', () => {
    const document = {
      _source: {
        street: 'Gajowa',
        district: 'Krzyki',
        hospital: {
          name: 'Szpital',
          address: 'Szpitalna 1',
          phone: '123 456 789'
        },
        apartments: [1,2,3]
      }
    };

    const address = mapToAddress(document);

    const expected = new Address(
      'Gajowa', 
      'Krzyki', 
      new Hospital('Szpital', 'Szpitalna 1', '123 456 789'), 
      ['1', '2', '3']
    );
  
    expect(address).toEqual(expected);
  });

  it('should handle empty apartments', () => {
    const document = {
      _source: {
        street: 'Gajowa',
        district: 'Krzyki',
        hospital: {
          name: 'Szpital',
          address: 'Szpitalna 1',
          phone: '123 456 789'
        },
        apartments: null
      }
    };

    const address = mapToAddress(document);

    const expected = new Address(
      'Gajowa', 
      'Krzyki', 
      new Hospital('Szpital', 'Szpitalna 1', '123 456 789'), 
      null
    );

    expect(address).toEqual(expected);
  })
})