import { Injectable } from '@angular/core';

/**
 * Portuguese IVA (VAT) Service
 * Handles IVA rate management for different product categories
 *
 * IVA Rates:
 * - 6% (Reduced) - Books, medicines, certain food items
 * - 13% (Intermediate) - Most food products, African products, cosmetics
 * - 23% (Standard) - Most other goods and services
 */
@Injectable({
  providedIn: 'root'
})
export class IvaService {
  // Valid IVA rates in Portugal (percentage values)
  private readonly VALID_RATES = [6, 13, 23];

  // Default IVA rate (13% intermediate rate - most common for food/cosmetics)
  private readonly DEFAULT_RATE = 13;

  // Category-to-IVA rate mapping
  private readonly CATEGORY_RATES: { [key: string]: number } = {
    'mercearia': 13,      // African foods - 13% intermediate
    'talho': 13,          // Meat products - 13% intermediate
    'peixaria': 13,       // Fish products - 13% intermediate
    'cosmeticos': 13,     // Natural cosmetics - 13% intermediate
    'produtosCaboVerde': 13, // Cape Verde products - 13% intermediate
    'outros': 23          // Other products - 23% standard
  };

  constructor() { }

  /**
   * Get all valid IVA rates
   * @returns Array of valid IVA rates
   */
  getValidRates(): number[] {
    return [...this.VALID_RATES];
  }

  /**
   * Get IVA rate for a product category
   * @param categoryId - The product category identifier
   * @returns IVA rate as percentage (6, 13, or 23)
   */
  getIvaRateForCategory(categoryId: string): number {
    const rate = this.CATEGORY_RATES[categoryId];
    return rate !== undefined ? rate : this.DEFAULT_RATE;
  }

  /**
   * Validate if a rate is a valid IVA rate
   * @param rate - Rate to validate
   * @returns True if rate is valid (6, 13, or 23)
   */
  isValidRate(rate: number | undefined): boolean {
    return rate !== undefined && this.VALID_RATES.includes(rate);
  }

  /**
   * Get effective IVA rate for a product
   * Uses product's ivaRate if set, otherwise uses category default
   * @param ivaRate - Product's specific IVA rate (optional)
   * @param categoryId - Product's category for fallback
   * @returns Effective IVA rate
   */
  getEffectiveRate(ivaRate: number | undefined, categoryId: string): number {
    if (this.isValidRate(ivaRate)) {
      return ivaRate!;
    }
    return this.getIvaRateForCategory(categoryId);
  }

  /**
   * Calculate IVA amount for a given price and rate
   * @param price - Base price (before IVA)
   * @param rate - IVA rate (if not provided, uses default)
   * @returns IVA amount
   */
  calculateIva(price: number, rate?: number): number {
    const effectiveRate = rate ?? this.DEFAULT_RATE;
    if (!this.isValidRate(effectiveRate)) {
      console.warn(`Invalid IVA rate: ${effectiveRate}, using default: ${this.DEFAULT_RATE}`);
      return (price * this.DEFAULT_RATE) / 100;
    }
    return (price * effectiveRate) / 100;
  }

  /**
   * Calculate final price including IVA
   * @param price - Base price (before IVA)
   * @param rate - IVA rate (if not provided, uses default)
   * @returns Final price including IVA
   */
  calculatePriceWithIva(price: number, rate?: number): number {
    const iva = this.calculateIva(price, rate);
    return price + iva;
  }

  /**
   * Get IVA description in Portuguese
   * @param rate - IVA rate
   * @returns Portuguese description
   */
  getIvaDescription(rate: number): string {
    switch (rate) {
      case 6:
        return 'IVA Reduzido (6%)';
      case 13:
        return 'IVA Intermédio (13%)';
      case 23:
        return 'IVA Normal (23%)';
      default:
        return 'IVA';
    }
  }

  /**
   * Get IVA description in English
   * @param rate - IVA rate
   * @returns English description
   */
  getIvaDescriptionEn(rate: number): string {
    switch (rate) {
      case 6:
        return 'Reduced VAT (6%)';
      case 13:
        return 'Intermediate VAT (13%)';
      case 23:
        return 'Standard VAT (23%)';
      default:
        return 'VAT';
    }
  }

  /**
   * Calculate total tax for a cart with mixed IVA rates
   * @param items - Array of cart items with price, quantity, and ivaRate
   * @returns Total tax amount
   */
  calculateTotalTax(items: Array<{ price: number; quantity: number; ivaRate?: number; categoryId?: string }>): number {
    return items.reduce((total, item) => {
      const itemSubtotal = item.price * item.quantity;
      const effectiveRate = this.getEffectiveRate(item.ivaRate, item.categoryId || 'outros');
      const itemTax = this.calculateIva(itemSubtotal, effectiveRate);
      return total + itemTax;
    }, 0);
  }

  /**
   * Get breakdown of taxes by rate for invoice purposes
   * @param items - Array of cart items with price, quantity, and ivaRate
   * @returns Object with tax breakdowns by rate
   */
  getTaxBreakdown(items: Array<{ price: number; quantity: number; ivaRate?: number; categoryId?: string }>): {
    rate6: number;
    rate13: number;
    rate23: number;
    total: number;
  } {
    const breakdown = {
      rate6: 0,
      rate13: 0,
      rate23: 0,
      total: 0
    };

    items.forEach(item => {
      const itemSubtotal = item.price * item.quantity;
      const effectiveRate = this.getEffectiveRate(item.ivaRate, item.categoryId || 'outros');
      const itemTax = this.calculateIva(itemSubtotal, effectiveRate);

      if (effectiveRate === 6) breakdown.rate6 += itemTax;
      else if (effectiveRate === 13) breakdown.rate13 += itemTax;
      else if (effectiveRate === 23) breakdown.rate23 += itemTax;

      breakdown.total += itemTax;
    });

    return breakdown;
  }
}
