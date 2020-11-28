import es from '../elasticsearch/suggestions';
import { getSuggestions } from './suggestionsService';
import { Address } from '../model/address';

jest.mock('../elasticsearch/suggestions', () => {
  return {
    fetchAddressesByPrefix: jest.fn()
  };
});

describe('getSuggestions', () => {
  it('should return empty suggestions when no address with given prefix', async () => {
    es.fetchAddressesByPrefix.mockResolvedValue([]);

    const actual = await getSuggestions('Gaj');

    expect(actual).toEqual([]);
  });


  it('should return suggestions address is found', async () => {
    es.fetchAddressesByPrefix.mockResolvedValue([
      new Address('Gajowicka'),
    ]);

    const actual = await getSuggestions('Gaj');

    expect(actual).toEqual(['Gajowicka']);
  });

  it('should remove duplicated addresses from suggestions', async () => {
    es.fetchAddressesByPrefix.mockResolvedValue([
      new Address('Gajowicka'),
      new Address('Gajowicka')
    ]);

    const actual = await getSuggestions('Gaj');

    expect(actual).toEqual(['Gajowicka']);
  });

  it('should preserve order of returned addresses', async () => {
    es.fetchAddressesByPrefix.mockResolvedValue([
      new Address('Abelowa'),
      new Address('Borowa')
    ]);

    const actual = await getSuggestions('');

    expect(actual).toEqual(['Abelowa', 'Borowa']);
  });
});