import { formatCurrency } from '../../../src/core/currency';

describe('FormatCurrency', () => {

  it('should format a number to 2 decimal places', () => {
    expect(formatCurrency(1.1234).replace(/[^\d\.]/g, '')).toEqual('1.12');
  });

  it('should include the dollar sign in the outputted string', () => {
    expect((/\$/).test(formatCurrency(1.1234))).toBe(true);
  });
});
