import test from 'node:test';
import assert from 'node:assert/strict';
import { validateReservation, calculateBill, formatINR, generateReservationCode } from './booking';
import { MenuItem } from '../types/restaurant';

const mockMenuItem: MenuItem = {
  id: 'test-virundhu',
  name: 'Rajaraja Chola Rajakeeya Virundhu',
  tamilName: 'ராஜராஜ சோழன் ராஜகீய விருந்து',
  category: 'virundhu',
  isVeg: true,
  price: 950,
  description: 'Grand feast',
  spiceLevel: 'Medium',
  highlight: 'Plantain leaf feast',
  image: '/test.jpg',
  ingredients: ['Rice', 'Ghee'],
};

test('validates correct reservation input', () => {
  const result = validateReservation({
    name: 'Rajarajan Sundaram',
    phone: '9840123456',
    email: 'rajarajan@example.com',
    date: '2026-11-15',
    timeSlot: '12:30 PM - Royal Lunch Virundhu',
    guests: 4,
  });

  assert.equal(result.isValid, true);
  assert.equal(Object.keys(result.errors).length, 0);
});

test('catches missing or invalid fields in reservation', () => {
  const result = validateReservation({
    name: 'A',
    phone: '123',
    email: 'invalid-email',
    date: '',
    timeSlot: '',
    guests: 0,
  });

  assert.equal(result.isValid, false);
  assert.ok(result.errors.name);
  assert.ok(result.errors.phone);
  assert.ok(result.errors.email);
  assert.ok(result.errors.date);
  assert.ok(result.errors.timeSlot);
  assert.ok(result.errors.guests);
});

test('calculates bill with GST and packaging charge threshold', () => {
  // Test case 1: Subtotal < 1000 -> includes 50 INR packaging
  const billSmall = calculateBill([{ item: mockMenuItem, quantity: 1 }]);
  assert.equal(billSmall.subtotal, 950);
  assert.equal(billSmall.gst, 48); // 950 * 0.05 = 47.5 -> 48
  assert.equal(billSmall.packaging, 50);
  assert.equal(billSmall.total, 1048);
  assert.equal(billSmall.totalItemsCount, 1);

  // Test case 2: Subtotal >= 1000 -> free packaging (0 INR)
  const billLarge = calculateBill([{ item: mockMenuItem, quantity: 2 }]);
  assert.equal(billLarge.subtotal, 1900);
  assert.equal(billLarge.gst, 95);
  assert.equal(billLarge.packaging, 0);
  assert.equal(billLarge.total, 1995);
  assert.equal(billLarge.totalItemsCount, 2);
});

test('formats Indian Rupees properly', () => {
  const formatted = formatINR(950);
  assert.ok(formatted.includes('950'));
});

test('generates royal reservation reference code with correct structure', () => {
  const code = generateReservationCode('2026-11-15', 4);
  assert.ok(code.startsWith('CHOLA-TNJ-'));
  assert.ok(code.includes('4P'));
});
