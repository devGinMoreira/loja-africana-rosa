/**
 * Pricing calculation utilities
 */

/**
 * Calculate promotional price from original price and discount percentage
 * @param original - Original price
 * @param discountPercentage - Discount percentage (0-100)
 * @returns Calculated promotional price, rounded to 2 decimals
 */
export function calculatePromotionalPrice(original: number, discountPercentage: number): number {
  if (discountPercentage < 0 || discountPercentage > 100) {
    throw new Error('Discount percentage must be between 0 and 100');
  }
  return Math.round(original * (1 - discountPercentage / 100) * 100) / 100;
}

/**
 * Calculate base price from final price and VAT tax
 * @param finalPrice - Final price (including VAT)
 * @param vatRate - VAT rate (6, 13, or 23)
 * @returns Base price without VAT
 */
export function calculateBasePrice(finalPrice: number, vatRate: 6 | 13 | 23): number {
  return Math.round((finalPrice / (1 + vatRate / 100)) * 100) / 100;
}

/**
 * Calculate final price from base price and VAT tax
 * @param basePrice - Base price (without VAT)
 * @param vatRate - VAT rate (6, 13, or 23)
 * @returns Final price including VAT
 */
export function calculateFinalPrice(basePrice: number, vatRate: 6 | 13 | 23): number {
  return Math.round(basePrice * (1 + vatRate / 100) * 100) / 100;
}

/**
 * Calculate VAT amount
 * @param finalPrice - Final price
 * @param vatRate - VAT rate
 * @returns VAT amount
 */
export function calculateVATAmount(finalPrice: number, vatRate: 6 | 13 | 23): number {
  const basePrice = calculateBasePrice(finalPrice, vatRate);
  return Math.round((finalPrice - basePrice) * 100) / 100;
}

/**
 * Check if a promotion is currently valid
 * @param validUntil - Promotion expiration date
 * @returns true if promotion is still valid
 */
export function isPromotionValid(validUntil: Date | string): boolean {
  const expirationDate = typeof validUntil === 'string' ? new Date(validUntil) : validUntil;
  return expirationDate > new Date();
}
