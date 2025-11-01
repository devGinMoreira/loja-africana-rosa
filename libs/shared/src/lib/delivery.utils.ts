/**
 * Delivery fee calculation and validation utilities
 */

/**
 * Almada postal code zones eligible for free delivery
 */
const ALMADA_POSTAL_CODES = ['2800', '2810', '2815', '2820'];

/**
 * Base delivery fee in EUR
 */
export const BASE_DELIVERY_FEE = 3.5;

/**
 * Minimum order amount for free delivery in Almada
 */
export const FREE_DELIVERY_THRESHOLD = 30;

/**
 * Check if a postal code is in Almada
 * @param postalCode - Portuguese postal code
 * @returns true if postal code is in Almada
 */
export function isAlmadaPostalCode(postalCode: string): boolean {
  const prefix = postalCode.substring(0, 4);
  return ALMADA_POSTAL_CODES.includes(prefix);
}

/**
 * Calculate delivery fee based on order amount and location
 * @param subtotal - Order subtotal in EUR
 * @param postalCode - Delivery postal code
 * @returns Delivery fee in EUR
 */
export function calculateDeliveryFee(subtotal: number, postalCode: string): number {
  // Free delivery for orders >= 30€ in Almada
  if (isAlmadaPostalCode(postalCode) && subtotal >= FREE_DELIVERY_THRESHOLD) {
    return 0;
  }
  return BASE_DELIVERY_FEE;
}

/**
 * Calculate total order amount including delivery fee
 * @param subtotal - Order subtotal
 * @param postalCode - Delivery postal code
 * @returns Total order amount with delivery fee
 */
export function calculateOrderTotal(subtotal: number, postalCode: string): number {
  const deliveryFee = calculateDeliveryFee(subtotal, postalCode);
  return Math.round((subtotal + deliveryFee) * 100) / 100;
}
