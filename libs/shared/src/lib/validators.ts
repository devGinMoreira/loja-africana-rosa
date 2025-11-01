/**
 * Validation utility functions
 */

/**
 * Validate email format
 * @param email - Email address
 * @returns true if email is valid
 */
export function isValidEmail(email: string): boolean {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
}

/**
 * Validate Portuguese phone number
 * @param phone - Phone number
 * @returns true if phone is valid
 */
export function isValidPhoneNumber(phone: string): boolean {
  const phoneRegex = /^(\+351|00351|9)?\d{8,9}$/;
  return phoneRegex.test(phone.replace(/\s|-/g, ''));
}

/**
 * Validate postal code format
 * @param postalCode - Portuguese postal code (format: XXXX-XXX)
 * @returns true if postal code is valid
 */
export function isValidPostalCode(postalCode: string): boolean {
  const postalCodeRegex = /^\d{4}-\d{3}$/;
  return postalCodeRegex.test(postalCode);
}

/**
 * Validate product stock quantity
 * @param quantity - Quantity to validate
 * @param availableStock - Available stock
 * @returns true if quantity is valid
 */
export function isValidQuantity(quantity: number, availableStock: number): boolean {
  return quantity > 0 && quantity <= availableStock && Number.isInteger(quantity);
}

/**
 * Validate product price
 * @param price - Price to validate
 * @returns true if price is valid (positive number with max 2 decimals)
 */
export function isValidPrice(price: number): boolean {
  return price > 0 && /^\d+(\.\d{1,2})?$/.test(price.toString());
}
