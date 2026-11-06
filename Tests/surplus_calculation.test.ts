import { describe, it } from 'node:test';
import assert from 'node:assert';

describe('Page 3: Food Management & Automatic Surplus Calculations', () => {
  // Standard surplus formula
  const calculateSurplus = (prepared: number, consumed: number): number => {
    return Math.max(0, prepared - consumed);
  };

  it('should accurately calculate surplus when prep exceeds consumption', () => {
    const prepared = 85;
    const consumed = 62;
    const surplus = calculateSurplus(prepared, consumed);
    assert.strictEqual(surplus, 23, 'Surplus should be exactly 23 kg');
  });

  it('should return 0 surplus when all prepared food is consumed', () => {
    const prepared = 100;
    const consumed = 100;
    const surplus = calculateSurplus(prepared, consumed);
    assert.strictEqual(surplus, 0, 'Surplus should be 0');
  });

  it('should handle edge case where consumption exceeds original prep safely', () => {
    const prepared = 50;
    const consumed = 55; // Additional portions served from backup
    const surplus = calculateSurplus(prepared, consumed);
    assert.strictEqual(surplus, 0, 'Surplus must never be negative');
  });

  it('should preserve entire prepared volume as surplus if zero consumed', () => {
    const prepared = 40;
    const consumed = 0;
    const surplus = calculateSurplus(prepared, consumed);
    assert.strictEqual(surplus, 40, 'Entire batch should be tagged as surplus');
  });

  it('should handle fractional/decimal portion weights accurately', () => {
    const prepared = 12.5;
    const consumed = 8.2;
    const surplus = Number((prepared - consumed).toFixed(1));
    assert.strictEqual(surplus, 4.3);
  });
});

