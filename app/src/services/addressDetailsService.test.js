import es from '../elasticsearch/addressDetails';
import { getAddressDetails } from './addressDetailsService';
import { Address } from '../model/address';

jest.mock('../elasticsearch/addressDetails', () => {
  return {
    fetchAddressDetails: jest.fn()
  };
});

describe('getAddressDetails', () => {
	it('should throw an error when address does not exist', async () => {
    es.fetchAddressDetails.mockResolvedValue([]);

    await expect(() => getAddressDetails('Idzikowskiego 123a'))
      .rejects
      .toThrow('Address not found');
  });

  describe('when no apartment is specified', () => {
    it('should return an address when there is one non-specific address', async () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, null);
  
      es.fetchAddressDetails.mockResolvedValue([address]);
  
      const result = await getAddressDetails('Idzikowskiego');
  
      expect(result).toEqual(address);
    });

    it('should throw when address is specific', async () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, ['1']);
  
      es.fetchAddressDetails.mockResolvedValue([address]);
  
      await expect(() => getAddressDetails('Idzikowskiego'))
        .rejects
        .toThrow('An address has to contain an apartment number.');

    });

    it('should throw when no apartment is specified and address', async () => {
      const addresses = [
        new Address('Idzikowskiego', 'Dzielnica', null, null),
        new Address('Idzikowskiego', 'Dzielnica 2', null, ['1'])
      ];

      es.fetchAddressDetails.mockResolvedValue(addresses);

      await expect(() => getAddressDetails('Idzikowskiego'))
        .rejects
        .toThrow('An address has to contain an apartment number');
    });
  });

  describe('when apartment is specified', () => {
    it('should return an address when exactly one address contains the apartment', async () => {
      const addresses = [
        new Address('Idzikowskiego', 'Dzielnica', null, ['1']),
        new Address('Idzikowskiego', 'Dzielnica 2', null, null)
      ];  
      
      es.fetchAddressDetails.mockResolvedValue(addresses);

      const actual = await getAddressDetails('Idzikowskiego 123a');
      
      expect(actual).toEqual(addresses[1]);
    });

    it('should throw when address does not contain given apartment', async () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, ['1']);
  
      es.fetchAddressDetails.mockResolvedValue([address]);
  
      await expect(() => getAddressDetails('Idzikowskiego 123a'))
        .rejects
        .toThrow('Address not found.');      
    })

    it('should throw when multiple addresses contain given apartment', async () => {
      const addresses = [
        new Address('Idzikowskiego', 'Dzielnica', null, ['1']),
        new Address('Idzikowskiego', 'Dzielnica 2', null, ['1'])
      ];
      
      es.fetchAddressDetails.mockResolvedValue(addresses);

      await expect(() => getAddressDetails('Idzikowskiego 1'))
      .rejects
      .toThrow('Address is ambiguous - it is assigned to multiple hospitals.');
    });
  })
});