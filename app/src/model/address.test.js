import { Address } from './address';

describe('Address', () => {
  describe('isSpecific', () => {
    it('should return true when address contains apartments', () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, [1, 2, 3]);

      expect(address.isSpecific()).toBeTruthy();
    });

    it('should return false when address does not contain apartments', () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, null);

      expect(address.isSpecific()).toBeFalsy();
    });
  });

  describe('containsApartment', () => {
    it('should return true when specific address contains an apartment', () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, [1, 2, 3]);

      expect(address.containsApartment(1)).toBeTruthy();  
    });

    it('should return false when specific address does not contain an apartment', () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, [1, 2, 3]);

      expect(address.containsApartment(10)).toBeFalsy();
    });

    it('should return true for non specific address', () => {
      const address = new Address('Idzikowskiego', 'Dzielnica', null, null);

      expect(address.containsApartment(10)).toBeTruthy();
    })
  })
})